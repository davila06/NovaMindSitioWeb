import { describe, expect, it } from "vitest";
import {
  calculateBusinessCommercialModel,
  businessCommercialModelSchema,
  type BusinessCommercialModelInput,
} from "@/lib/business-commercial/model";

const syntheticModel: BusinessCommercialModelInput = {
  schemaVersion: "1.0.0",
  tier: "business",
  currencyCode: "XXX",
  workload: {
    users: 2,
    endpoints: 3,
    sites: 1,
    remoteHours: 4,
    onsiteHours: 2,
    travelHours: 1,
    microsoft365Hours: 1,
    endpointManagementHours: 1,
    securityHours: 1,
    backupHours: 0.5,
    cloudHours: 0,
    specialistHours: 1,
    serviceDeskHours: 2,
    afterHoursHours: 0,
    projectHours: 0,
    capacityAvailableHours: 20,
  },
  costs: {
    rates: {
      remoteHour: 10,
      onsiteHour: 20,
      travelHour: 5,
      microsoft365Hour: 15,
      endpointManagementHour: 12,
      securityHour: 18,
      backupHour: 8,
      cloudHour: 25,
      specialistHour: 30,
      serviceDeskHour: 6,
    },
    unitCosts: {
      userMonthlyCost: 0,
      endpointMonthlyCost: 0,
      siteMonthlyCost: 0,
    },
    monthlyTravelExpense: 0,
    monthlyTooling: 50,
    monthlyInternalLicenses: 30,
    overheadRate: 0.1,
    contingencyRate: 0.05,
    targetGrossMargin: 0.25,
  },
  guardrailPolicy: {
    maxOnsiteShare: 0.2,
    maxUtilization: 0.8,
  },
  pricingOptions: [
    { id: "base", kind: "monthly_base", baseMonthly: 450 },
    { id: "user", kind: "per_user", perUser: 90 },
    {
      id: "endpoint",
      kind: "per_endpoint",
      perEndpoint: 40,
    },
    {
      id: "base-user",
      kind: "base_plus_user",
      baseMonthly: 100,
      perUser: 50,
    },
    {
      id: "base-endpoint",
      kind: "base_plus_endpoint",
      baseMonthly: 100,
      perEndpoint: 40,
    },
    {
      id: "base-user-endpoint",
      kind: "base_plus_user_endpoint",
      baseMonthly: 100,
      perUser: 20,
      perEndpoint: 10,
    },
    { id: "retainer", kind: "retainer", retainerMonthly: 300 },
    {
      id: "band",
      kind: "band",
      basis: "users",
      bands: [{ minimum: 1, maximum: 5, monthlyPrice: 350 }],
    },
    { id: "custom", kind: "custom", customMonthly: 500 },
  ],
  sensitivities: {
    additionalUser: {
      users: 1,
      remoteHours: 1,
      serviceDeskHours: 0.5,
    },
    additionalEndpoint: {
      endpoints: 1,
      endpointManagementHours: 0.5,
    },
    additionalOnsiteHour: { onsiteHours: 1, travelHours: 0.5 },
    additionalSpecialistHour: { specialistHours: 1 },
  },
};

describe("business commercial model", () => {
  it("calculates fully specified synthetic costs, capacity, break-even, and target price", () => {
    const result = calculateBusinessCommercialModel(syntheticModel);

    expect(result.status).toBe("complete");
    expect(result.estimate?.directCost).toBe(256);
    expect(result.estimate?.overheadCost).toBe(25.6);
    expect(result.estimate?.contingencyCost).toBeCloseTo(14.08);
    expect(result.estimate?.monthlyCost).toBeCloseTo(295.68);
    expect(result.estimate?.capacityHours).toBe(13.5);
    expect(result.estimate?.utilization).toBe(0.675);
    expect(result.estimate?.breakEvenMonthlyRevenue).toBeCloseTo(295.68);
    expect(result.estimate?.targetPrice).toBeCloseTo(394.24);
    expect(result.estimate?.targetGrossMargin).toBe(0.25);
  });

  it("keeps an estimate incomplete when any required cost input is absent", () => {
    const { costs, ...model } = syntheticModel;
    const incomplete = {
      ...model,
      costs: {
        ...costs,
        rates: { ...costs.rates, specialistHour: undefined },
      },
    };

    const result = calculateBusinessCommercialModel(incomplete);

    expect(result.status).toBe("incomplete");
    expect(result.estimate).toBeNull();
    expect(result.missingFields).toContain("costs.rates.specialistHour");
  });

  it("compares configured price models without selecting a winner", () => {
    const result = calculateBusinessCommercialModel(syntheticModel);

    expect(
      result.pricingComparisons.map(({ id, monthlyPrice }) => ({
        id,
        monthlyPrice,
      })),
    ).toEqual([
      { id: "base", monthlyPrice: 450 },
      { id: "user", monthlyPrice: 180 },
      { id: "endpoint", monthlyPrice: 120 },
      { id: "base-user", monthlyPrice: 200 },
      { id: "base-endpoint", monthlyPrice: 220 },
      { id: "base-user-endpoint", monthlyPrice: 170 },
      { id: "retainer", monthlyPrice: 300 },
      { id: "band", monthlyPrice: 350 },
      { id: "custom", monthlyPrice: 500 },
    ]);
    expect(result).not.toHaveProperty("recommendedPricingOption");
  });

  it("reports margin, onsite, utilization, scope, coverage, and sensitivity guardrails", () => {
    const result = calculateBusinessCommercialModel({
      ...syntheticModel,
      guardrailPolicy: {
        ...syntheticModel.guardrailPolicy,
        maxOnsiteShare: 0.1,
        maxUtilization: 0.8,
      },
      workload: {
        ...syntheticModel.workload,
        capacityAvailableHours: 10,
        afterHoursHours: 1,
        projectHours: 2,
      },
      pricingOptions: [
        { id: "underpriced", kind: "monthly_base", baseMonthly: 50 },
      ],
    });

    const codes = result.guardrails.map(({ code }) => code);
    expect(codes).toContain("negative_gross_margin");
    expect(codes).toContain("onsite_share_exceeded");
    expect(codes).toContain("utilization_exceeded");
    expect(codes).toContain("specialist_not_separately_priced");
    expect(codes).toContain("tooling_not_covered");
    expect(codes).toContain("after_hours_out_of_scope");
    expect(codes).toContain("project_work_out_of_scope");
    expect(result.sensitivity).toMatchObject({
      additionalUserCost: expect.any(Number),
      additionalEndpointCost: expect.any(Number),
      additionalOnsiteHourCost: expect.any(Number),
      additionalSpecialistHourCost: expect.any(Number),
    });
  });

  it("flags a configured zero capacity when the scenario consumes support hours", () => {
    const result = calculateBusinessCommercialModel({
      ...syntheticModel,
      workload: {
        ...syntheticModel.workload,
        capacityAvailableHours: 0,
      },
    });

    expect(result.estimate?.utilization).toBeNull();
    expect(result.guardrails.map(({ code }) => code)).toContain(
      "zero_capacity_with_workload",
    );
  });

  it("flags fixed price options when incremental users do not change the price", () => {
    const result = calculateBusinessCommercialModel({
      ...syntheticModel,
      pricingOptions: [
        { id: "fixed", kind: "monthly_base", baseMonthly: 500 },
        { id: "per-user", kind: "per_user", perUser: 100 },
      ],
    });

    const fixed = result.pricingComparisons.find(({ id }) => id === "fixed");
    const perUser = result.pricingComparisons.find(
      ({ id }) => id === "per-user",
    );
    expect(fixed?.guardrails.map(({ code }) => code)).toContain(
      "user_growth_not_priced",
    );
    expect(perUser?.guardrails.map(({ code }) => code)).not.toContain(
      "user_growth_not_priced",
    );
  });

  it("reports unmatched bands instead of inferring a price", () => {
    const result = calculateBusinessCommercialModel({
      ...syntheticModel,
      pricingOptions: [
        {
          id: "small-users",
          kind: "band",
          basis: "users",
          bands: [{ minimum: 5, maximum: 10, monthlyPrice: 500 }],
        },
      ],
    });

    expect(result.pricingComparisons[0].monthlyPrice).toBeNull();
    expect(result.pricingComparisons[0].guardrails.map(({ code }) => code)).toContain(
      "band_not_matched",
    );
  });

  it("rejects negative values and invalid ratios in the configuration schema", () => {
    expect(
      businessCommercialModelSchema.safeParse({
        ...syntheticModel,
        workload: { ...syntheticModel.workload, endpoints: 1.5 },
      }).success,
    ).toBe(false);
    expect(
      businessCommercialModelSchema.safeParse({
        ...syntheticModel,
        workload: { ...syntheticModel.workload, users: -1 },
      }).success,
    ).toBe(false);
    expect(
      businessCommercialModelSchema.safeParse({
        ...syntheticModel,
        costs: { ...syntheticModel.costs, targetGrossMargin: 1 },
      }).success,
    ).toBe(false);
  });
});

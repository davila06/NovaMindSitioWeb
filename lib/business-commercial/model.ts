import { z } from "zod";

const nonNegative = z.number().finite().min(0);
const nonNegativeCount = z.number().finite().int().min(0);
const optionalNonNegative = nonNegative.optional();
const optionalCount = nonNegativeCount.optional();
const optionalRatio = z.number().finite().min(0).max(0.999999).optional();

const workloadSchema = z.object({
  users: optionalCount,
  endpoints: optionalCount,
  sites: optionalCount,
  remoteHours: optionalNonNegative,
  onsiteHours: optionalNonNegative,
  travelHours: optionalNonNegative,
  microsoft365Hours: optionalNonNegative,
  endpointManagementHours: optionalNonNegative,
  securityHours: optionalNonNegative,
  backupHours: optionalNonNegative,
  cloudHours: optionalNonNegative,
  specialistHours: optionalNonNegative,
  serviceDeskHours: optionalNonNegative,
  afterHoursHours: optionalNonNegative,
  projectHours: optionalNonNegative,
  capacityAvailableHours: optionalNonNegative,
}).strict();

const rateSchema = z.object({
  remoteHour: optionalNonNegative,
  onsiteHour: optionalNonNegative,
  travelHour: optionalNonNegative,
  microsoft365Hour: optionalNonNegative,
  endpointManagementHour: optionalNonNegative,
  securityHour: optionalNonNegative,
  backupHour: optionalNonNegative,
  cloudHour: optionalNonNegative,
  specialistHour: optionalNonNegative,
  serviceDeskHour: optionalNonNegative,
}).strict();

const unitCostSchema = z.object({
  userMonthlyCost: optionalNonNegative,
  endpointMonthlyCost: optionalNonNegative,
  siteMonthlyCost: optionalNonNegative,
}).strict();

const pricingBase = {
  id: z.string().trim().min(1),
  specialistMonthlyFee: optionalNonNegative,
};

const pricingOptionSchema = z.discriminatedUnion("kind", [
  z.object({
    ...pricingBase,
    kind: z.literal("monthly_base"),
    baseMonthly: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("per_user"),
    perUser: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("per_endpoint"),
    perEndpoint: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("base_plus_user"),
    baseMonthly: nonNegative,
    perUser: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("base_plus_endpoint"),
    baseMonthly: nonNegative,
    perEndpoint: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("base_plus_user_endpoint"),
    baseMonthly: nonNegative,
    perUser: nonNegative,
    perEndpoint: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("retainer"),
    retainerMonthly: nonNegative,
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("band"),
    basis: z.enum(["users", "endpoints"]),
    bands: z.array(
      z.object({
        minimum: nonNegativeCount,
        maximum: nonNegativeCount,
        monthlyPrice: nonNegative,
      }).strict(),
    ).min(1),
  }).strict(),
  z.object({
    ...pricingBase,
    kind: z.literal("custom"),
    customMonthly: nonNegative,
  }).strict(),
]);

export const businessCommercialModelSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  tier: z.enum(["business", "business_pro"]),
  currencyCode: z.string().regex(/^[A-Z]{3}$/),
  workload: workloadSchema,
  costs: z.object({
    rates: rateSchema,
    unitCosts: unitCostSchema,
    monthlyTravelExpense: optionalNonNegative,
    monthlyTooling: optionalNonNegative,
    monthlyInternalLicenses: optionalNonNegative,
    overheadRate: optionalRatio,
    contingencyRate: optionalRatio,
    targetGrossMargin: optionalRatio,
  }).strict(),
  guardrailPolicy: z.object({
    maxOnsiteShare: optionalRatio,
    maxUtilization: optionalRatio,
    maxMonthlyHours: optionalNonNegative,
  }).strict().optional(),
  pricingOptions: z.array(pricingOptionSchema).default([]),
  sensitivities: z.object({
    additionalUser: workloadSchema.partial().optional(),
    additionalEndpoint: workloadSchema.partial().optional(),
    additionalOnsiteHour: workloadSchema.partial().optional(),
    additionalSpecialistHour: workloadSchema.partial().optional(),
  }).strict().optional(),
}).strict().superRefine((model, context) => {
  const ids = new Set<string>();
  model.pricingOptions.forEach((option, index) => {
    if (ids.has(option.id)) {
      context.addIssue({
        code: "custom",
        path: ["pricingOptions", index, "id"],
        message: "Pricing option ids must be unique.",
      });
    }
    ids.add(option.id);
    if (option.kind !== "band") return;
    for (let bandIndex = 0; bandIndex < option.bands.length; bandIndex += 1) {
      const current = option.bands[bandIndex];
      if (current.minimum > current.maximum) {
        context.addIssue({
          code: "custom",
          path: ["pricingOptions", index, "bands", bandIndex],
          message: "Band minimum must not exceed its maximum.",
        });
      }
      const overlaps = option.bands
        .slice(0, bandIndex)
        .some(
          (previous) =>
            current.minimum <= previous.maximum &&
            previous.minimum <= current.maximum,
        );
      if (overlaps) {
        context.addIssue({
          code: "custom",
          path: ["pricingOptions", index, "bands", bandIndex],
          message: "Bands for the same basis must not overlap.",
        });
      }
    }
  });
});

export type BusinessCommercialModelInput = z.input<
  typeof businessCommercialModelSchema
>;
type ParsedModel = z.infer<typeof businessCommercialModelSchema>;
type Workload = z.infer<typeof workloadSchema>;
type PricingOption = z.infer<typeof pricingOptionSchema>;

export const businessCommercialTiers = {
  business: [
    "recurring_support",
    "maintenance",
    "incidents",
    "microsoft_365_basic",
    "security_basic",
    "backup_review",
    "history",
  ],
  business_pro: [
    "recurring_support",
    "maintenance",
    "incidents",
    "microsoft_365_basic",
    "security_basic",
    "backup_review",
    "history",
    "preventive_management",
    "inventory",
    "lifecycle",
    "standardization",
    "technology_roadmap",
    "identity",
    "agreed_cloud",
    "continuity",
    "periodic_review",
  ],
} as const;

const requiredWorkloadFields: Array<keyof Workload> = [
  "users",
  "endpoints",
  "sites",
  "remoteHours",
  "onsiteHours",
  "travelHours",
  "microsoft365Hours",
  "endpointManagementHours",
  "securityHours",
  "backupHours",
  "cloudHours",
  "specialistHours",
  "serviceDeskHours",
  "afterHoursHours",
  "projectHours",
  "capacityAvailableHours",
];
const requiredUnitCostFields: Array<
  keyof ParsedModel["costs"]["unitCosts"]
> = ["userMonthlyCost", "endpointMonthlyCost", "siteMonthlyCost"];

const requiredRateFields: Array<keyof ParsedModel["costs"]["rates"]> = [
  "remoteHour",
  "onsiteHour",
  "travelHour",
  "microsoft365Hour",
  "endpointManagementHour",
  "securityHour",
  "backupHour",
  "cloudHour",
  "specialistHour",
  "serviceDeskHour",
];

export type CommercialGuardrail = {
  code:
    | "negative_gross_margin"
    | "onsite_share_exceeded"
    | "utilization_exceeded"
    | "specialist_not_separately_priced"
    | "tooling_not_covered"
    | "user_growth_not_priced"
    | "endpoint_growth_not_priced"
    | "after_hours_out_of_scope"
    | "project_work_out_of_scope"
    | "consumption_limit_exceeded"
    | "scope_creep_threshold_not_configured"
    | "zero_capacity_with_workload"
    | "band_not_matched";
  severity: "warning" | "critical";
  pricingOptionId?: string;
};

export type PricingComparison = {
  id: string;
  kind: PricingOption["kind"];
  monthlyPrice: number | null;
  grossMargin: number | null;
  breakEven: boolean | null;
  guardrails: CommercialGuardrail[];
};

export type CommercialModelResult = {
  status: "complete" | "incomplete" | "invalid";
  currencyCode: string | null;
  missingFields: string[];
  validationIssues: string[];
  estimate: null | {
    directCost: number;
    overheadCost: number;
    contingencyCost: number;
    monthlyCost: number;
    capacityHours: number;
    utilization: number | null;
    costPerCustomer: number;
    breakEvenMonthlyRevenue: number;
    targetGrossMargin: number;
    targetPrice: number;
  };
  pricingComparisons: PricingComparison[];
  sensitivity: {
    additionalUserCost: number | null;
    additionalEndpointCost: number | null;
    additionalOnsiteHourCost: number | null;
    additionalSpecialistHourCost: number | null;
  };
  guardrails: CommercialGuardrail[];
};

function calculatePrice(option: PricingOption, workload: Workload) {
  const specialistFee = option.specialistMonthlyFee ?? 0;
  const users = workload.users;
  const endpoints = workload.endpoints;
  switch (option.kind) {
    case "monthly_base":
      return option.baseMonthly + specialistFee;
    case "per_user":
      return users === undefined
        ? null
        : option.perUser * users + specialistFee;
    case "per_endpoint":
      return endpoints === undefined
        ? null
        : option.perEndpoint * endpoints + specialistFee;
    case "base_plus_user":
      return users === undefined
        ? null
        : option.baseMonthly + option.perUser * users + specialistFee;
    case "base_plus_endpoint":
      return endpoints === undefined
        ? null
        : option.baseMonthly + option.perEndpoint * endpoints + specialistFee;
    case "base_plus_user_endpoint":
      if (users === undefined || endpoints === undefined) return null;
      return (
        option.baseMonthly +
        option.perUser * users +
        option.perEndpoint * endpoints +
        specialistFee
      );
    case "retainer":
      return option.retainerMonthly + specialistFee;
    case "band": {
      const count = option.basis === "users" ? users : endpoints;
      if (count === undefined) return null;
      const band = option.bands.find(
        ({ minimum, maximum }) => count >= minimum && count <= maximum,
      );
      return band ? band.monthlyPrice + specialistFee : null;
    }
    case "custom":
      return option.customMonthly + specialistFee;
  }
}

function calculateCosts(model: ParsedModel, workload: Workload) {
  const {
    rates,
    unitCosts,
    monthlyTravelExpense,
    monthlyTooling,
    monthlyInternalLicenses,
    overheadRate,
    contingencyRate,
  } = model.costs;
  const directLabor =
    workload.remoteHours! * rates.remoteHour! +
    workload.onsiteHours! * rates.onsiteHour! +
    workload.travelHours! * rates.travelHour! +
    workload.microsoft365Hours! * rates.microsoft365Hour! +
    workload.endpointManagementHours! * rates.endpointManagementHour! +
    workload.securityHours! * rates.securityHour! +
    workload.backupHours! * rates.backupHour! +
    workload.cloudHours! * rates.cloudHour! +
    workload.specialistHours! * rates.specialistHour! +
    workload.serviceDeskHours! * rates.serviceDeskHour!;
  const directCost =
    directLabor +
    workload.users! * unitCosts.userMonthlyCost! +
    workload.endpoints! * unitCosts.endpointMonthlyCost! +
    workload.sites! * unitCosts.siteMonthlyCost! +
    monthlyTravelExpense! +
    monthlyTooling! +
    monthlyInternalLicenses!;
  const overheadCost = directCost * overheadRate!;
  const contingencyCost = (directCost + overheadCost) * contingencyRate!;
  const monthlyCost = directCost + overheadCost + contingencyCost;
  const capacityHours =
    workload.remoteHours! +
    workload.onsiteHours! +
    workload.travelHours! +
    workload.microsoft365Hours! +
    workload.endpointManagementHours! +
    workload.securityHours! +
    workload.backupHours! +
    workload.cloudHours! +
    workload.specialistHours! +
    workload.serviceDeskHours!;
  const utilization =
    workload.capacityAvailableHours! > 0
      ? capacityHours / workload.capacityAvailableHours!
      : null;
  const targetGrossMargin = model.costs.targetGrossMargin!;

  return {
    directCost,
    overheadCost,
    contingencyCost,
    monthlyCost,
    capacityHours,
    utilization,
    costPerCustomer: monthlyCost,
    breakEvenMonthlyRevenue: monthlyCost,
    targetGrossMargin,
    targetPrice: monthlyCost / (1 - targetGrossMargin),
  };
}

function missingCostFields(model: ParsedModel) {
  const missing = requiredWorkloadFields
    .filter((field) => model.workload[field] === undefined)
    .map((field) => `workload.${field}`);
  missing.push(
    ...requiredRateFields
      .filter((field) => model.costs.rates[field] === undefined)
      .map((field) => `costs.rates.${field}`),
  );
  missing.push(
    ...requiredUnitCostFields
      .filter((field) => model.costs.unitCosts[field] === undefined)
      .map((field) => `costs.unitCosts.${field}`),
  );
  for (const field of [
    "monthlyTravelExpense",
    "monthlyTooling",
    "monthlyInternalLicenses",
    "overheadRate",
    "contingencyRate",
    "targetGrossMargin",
  ] as const) {
    if (model.costs[field] === undefined) missing.push(`costs.${field}`);
  }
  return missing;
}

function addWorkload(base: Workload, delta: Partial<Workload>): Workload {
  const next = { ...base };
  for (const [key, value] of Object.entries(delta)) {
    if (value !== undefined) {
      const field = key as keyof Workload;
      next[field] = (next[field] ?? 0) + value;
    }
  }
  return next;
}

function calculateSensitivity(
  model: ParsedModel,
  estimate: CommercialModelResult["estimate"],
) {
  const scenario = (
    delta: Partial<Workload> | undefined,
  ): number | null => {
    if (!delta || !estimate) return null;
    return calculateCosts(model, addWorkload(model.workload, delta)).monthlyCost! -
      estimate.monthlyCost;
  };
  return {
    additionalUserCost: scenario(model.sensitivities?.additionalUser),
    additionalEndpointCost: scenario(model.sensitivities?.additionalEndpoint),
    additionalOnsiteHourCost: scenario(model.sensitivities?.additionalOnsiteHour),
    additionalSpecialistHourCost: scenario(
      model.sensitivities?.additionalSpecialistHour,
    ),
  };
}

function collectGuardrails(
  model: ParsedModel,
  estimate: CommercialModelResult["estimate"],
  comparisons: PricingComparison[],
): CommercialGuardrail[] {
  const guardrails: CommercialGuardrail[] = [];
  const workload = model.workload;
  const policy = model.guardrailPolicy;
  const totalSupportHours =
    (workload.remoteHours ?? 0) +
    (workload.onsiteHours ?? 0) +
    (workload.travelHours ?? 0) +
    (workload.microsoft365Hours ?? 0) +
    (workload.endpointManagementHours ?? 0) +
    (workload.securityHours ?? 0) +
    (workload.backupHours ?? 0) +
    (workload.cloudHours ?? 0) +
    (workload.specialistHours ?? 0) +
    (workload.serviceDeskHours ?? 0);
  const onsiteShare =
    totalSupportHours > 0
      ? (workload.onsiteHours ?? 0) / totalSupportHours
      : 0;

  if (
    workload.capacityAvailableHours === 0 &&
    totalSupportHours > 0
  ) {
    guardrails.push({
      code: "zero_capacity_with_workload",
      severity: "critical",
    });
  }
  if (
    policy?.maxOnsiteShare !== undefined &&
    onsiteShare > policy.maxOnsiteShare
  ) {
    guardrails.push({ code: "onsite_share_exceeded", severity: "warning" });
  }
  if (
    estimate?.utilization !== null &&
    estimate?.utilization !== undefined &&
    policy?.maxUtilization !== undefined &&
    estimate.utilization > policy.maxUtilization
  ) {
    guardrails.push({ code: "utilization_exceeded", severity: "critical" });
  }
  if (
    policy?.maxMonthlyHours !== undefined &&
    totalSupportHours > policy.maxMonthlyHours
  ) {
    guardrails.push({ code: "consumption_limit_exceeded", severity: "warning" });
  }
  if (
    policy?.maxMonthlyHours === undefined &&
    totalSupportHours > 0
  ) {
    guardrails.push({
      code: "scope_creep_threshold_not_configured",
      severity: "warning",
    });
  }
  if ((workload.afterHoursHours ?? 0) > 0) {
    guardrails.push({ code: "after_hours_out_of_scope", severity: "warning" });
  }
  if ((workload.projectHours ?? 0) > 0) {
    guardrails.push({ code: "project_work_out_of_scope", severity: "warning" });
  }
  for (const comparison of comparisons) {
    const option = model.pricingOptions.find(({ id }) => id === comparison.id);
    if (!option) continue;
    if (comparison.monthlyPrice === null) {
      if (comparison.kind === "band") {
        guardrails.push({
          code: "band_not_matched",
          severity: "warning",
          pricingOptionId: comparison.id,
        });
      }
      continue;
    }
    if (
      (workload.specialistHours ?? 0) > 0 &&
      (option.specialistMonthlyFee ?? 0) === 0
    ) {
      guardrails.push({
        code: "specialist_not_separately_priced",
        severity: "warning",
        pricingOptionId: comparison.id,
      });
    }
    if (
      estimate &&
      comparison.monthlyPrice < estimate.monthlyCost
    ) {
      guardrails.push({
        code: "negative_gross_margin",
        severity: "critical",
        pricingOptionId: comparison.id,
      });
    }
    if (
      model.costs.monthlyTooling !== undefined &&
      model.costs.monthlyInternalLicenses !== undefined &&
      estimate &&
      comparison.monthlyPrice <
        model.costs.monthlyTooling +
          model.costs.monthlyInternalLicenses +
          workload.users! * model.costs.unitCosts.userMonthlyCost! +
          workload.endpoints! * model.costs.unitCosts.endpointMonthlyCost! +
          workload.sites! * model.costs.unitCosts.siteMonthlyCost! +
          model.costs.monthlyTravelExpense!
    ) {
      guardrails.push({
        code: "tooling_not_covered",
        severity: "critical",
        pricingOptionId: comparison.id,
      });
    }
    const userDelta = model.sensitivities?.additionalUser;
    if (
      userDelta?.users &&
      workload.users !== undefined &&
      calculatePrice(option, addWorkload(workload, userDelta)) ===
        comparison.monthlyPrice
    ) {
      guardrails.push({
        code: "user_growth_not_priced",
        severity: "warning",
        pricingOptionId: comparison.id,
      });
    }
    const endpointDelta = model.sensitivities?.additionalEndpoint;
    if (
      endpointDelta?.endpoints &&
      workload.endpoints !== undefined &&
      calculatePrice(option, addWorkload(workload, endpointDelta)) ===
        comparison.monthlyPrice
    ) {
      guardrails.push({
        code: "endpoint_growth_not_priced",
        severity: "warning",
        pricingOptionId: comparison.id,
      });
    }
  }
  return guardrails;
}

export function calculateBusinessCommercialModel(
  input: unknown,
): CommercialModelResult {
  const parsed = businessCommercialModelSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "invalid",
      currencyCode: null,
      missingFields: [],
      validationIssues: parsed.error.issues.map(
        ({ path, message }) => `${path.join(".")}: ${message}`,
      ),
      estimate: null,
      pricingComparisons: [],
      sensitivity: {
        additionalUserCost: null,
        additionalEndpointCost: null,
        additionalOnsiteHourCost: null,
        additionalSpecialistHourCost: null,
      },
      guardrails: [],
    };
  }

  const model = parsed.data;
  const missingFields = missingCostFields(model);
  const estimate =
    missingFields.length === 0
      ? calculateCosts(model, model.workload)
      : null;
  const pricingComparisons = model.pricingOptions.map((option) => {
    const monthlyPrice = calculatePrice(option, model.workload);
    return {
      id: option.id,
      kind: option.kind,
      monthlyPrice,
      grossMargin:
        monthlyPrice !== null && monthlyPrice > 0 && estimate
          ? (monthlyPrice - estimate.monthlyCost) / monthlyPrice
          : null,
      breakEven:
        monthlyPrice !== null && estimate
          ? monthlyPrice >= estimate.monthlyCost
          : null,
      guardrails: [],
    };
  });
  const guardrails = collectGuardrails(model, estimate, pricingComparisons);

  return {
    status: estimate ? "complete" : "incomplete",
    currencyCode: model.currencyCode,
    missingFields,
    validationIssues: [],
    estimate,
    pricingComparisons: pricingComparisons.map((comparison) => ({
      ...comparison,
      guardrails: guardrails.filter(
        (guardrail) => guardrail.pricingOptionId === comparison.id,
      ),
    })),
    sensitivity: calculateSensitivity(model, estimate),
    guardrails,
  };
}

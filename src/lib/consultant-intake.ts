export async function submitConsultantIntake(input: {
  name: FormDataEntryValue | undefined;
  email: FormDataEntryValue | undefined;
  phone: FormDataEntryValue | undefined;
  service: string;
  otherService: string;
  description: FormDataEntryValue | undefined;
  website: FormDataEntryValue | undefined;
  sourcePage: string;
}) {
  const response = await fetch("/api/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-zavior-form": "consultation" },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone,
      service: input.service,
      otherService: input.otherService,
      projectDescription: input.description,
      serviceQuestions: {},
      source: "website_consultant_chat",
      sourcePage: input.sourcePage,
      website: input.website || "",
    }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "We couldn’t submit your request right now. Please try again in a moment.");
  }

  return {
    submissionId: typeof result.submissionId === "string" || typeof result.submissionId === "number"
      ? String(result.submissionId)
      : "",
  };
}

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
  const [firstName, ...lastNameParts] = String(input.name || "").trim().split(/\s+/);
  const lastName = lastNameParts.join(" ") || "-";
  const response = await fetch("/zavior/formsubmit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-zavior-form": "leadform" },
    body: JSON.stringify({
      firstName,
      lastName,
      email: input.email,
      phone: input.phone,
      company: "",
      service: "Consultation",
      message: [
        `Requested service: ${input.service}${input.service === "other" && input.otherService ? ` (${input.otherService})` : ""}`,
        `Source page: ${input.sourcePage}`,
        "",
        "Project details:",
        String(input.description || ""),
      ].join("\n").slice(0, 2_000),
      source: "Website",
      utm_medium: "chat_consultation",
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
    delivery: result.delivery === "email" ? "email" as const : "odoo" as const,
  };
}

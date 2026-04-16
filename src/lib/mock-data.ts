export interface DiagnosticTest {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  turnaround: string;
  popular: boolean;
  parameters: number;
}

export interface CartItem extends DiagnosticTest {
  quantity: number;
}

export interface Order {
  id: string;
  testName: string;
  patientName: string;
  date: string;
  status: "pending" | "sample-collected" | "processing" | "completed";
  amount: number;
  prescriptionUrl?: string;
  reportUrl?: string;
}

export const diagnosticTests: DiagnosticTest[] = [
  { id: "1", name: "Complete Blood Count (CBC)", description: "Measures different components of blood including red blood cells, white blood cells, and platelets.", price: 399, originalPrice: 599, category: "Hematology", turnaround: "6 hours", popular: true, parameters: 24 },
  { id: "2", name: "Lipid Profile", description: "Comprehensive cholesterol test measuring total cholesterol, HDL, LDL, and triglycerides.", price: 499, originalPrice: 799, category: "Biochemistry", turnaround: "12 hours", popular: true, parameters: 8 },
  { id: "3", name: "Thyroid Profile (T3, T4, TSH)", description: "Complete thyroid function test to assess thyroid gland activity and hormone levels.", price: 649, originalPrice: 999, category: "Endocrinology", turnaround: "24 hours", popular: true, parameters: 3 },
  { id: "4", name: "HbA1c (Glycated Hemoglobin)", description: "Measures average blood sugar levels over the past 2-3 months for diabetes monitoring.", price: 449, originalPrice: 650, category: "Diabetes", turnaround: "12 hours", popular: true, parameters: 1 },
  { id: "5", name: "Liver Function Test (LFT)", description: "Comprehensive panel to assess liver health including enzymes, proteins, and bilirubin.", price: 549, originalPrice: 850, category: "Biochemistry", turnaround: "12 hours", popular: false, parameters: 12 },
  { id: "6", name: "Kidney Function Test (KFT)", description: "Evaluates kidney health by measuring creatinine, BUN, uric acid, and electrolytes.", price: 599, originalPrice: 900, category: "Biochemistry", turnaround: "12 hours", popular: false, parameters: 10 },
  { id: "7", name: "Vitamin D Total", description: "Measures 25-hydroxy vitamin D levels to check for deficiency or excess.", price: 799, originalPrice: 1200, category: "Vitamins", turnaround: "24 hours", popular: true, parameters: 1 },
  { id: "8", name: "Vitamin B12", description: "Measures vitamin B12 levels essential for nerve function and red blood cell formation.", price: 699, originalPrice: 1000, category: "Vitamins", turnaround: "24 hours", popular: false, parameters: 1 },
  { id: "9", name: "Iron Studies", description: "Comprehensive iron panel including serum iron, ferritin, TIBC, and transferrin saturation.", price: 899, originalPrice: 1400, category: "Hematology", turnaround: "24 hours", popular: false, parameters: 4 },
  { id: "10", name: "Full Body Checkup", description: "Complete health screening with 70+ parameters covering all major organ functions.", price: 1999, originalPrice: 4500, category: "Health Packages", turnaround: "48 hours", popular: true, parameters: 72 },
  { id: "11", name: "COVID-19 RT-PCR", description: "Gold standard molecular test for detecting active SARS-CoV-2 infection.", price: 499, originalPrice: 800, category: "Infectious Disease", turnaround: "24 hours", popular: false, parameters: 1 },
  { id: "12", name: "Urine Routine & Microscopy", description: "Analyzes urine for infections, kidney disorders, and metabolic conditions.", price: 199, originalPrice: 350, category: "Pathology", turnaround: "6 hours", popular: false, parameters: 15 },
];

export const categories = ["All", "Hematology", "Biochemistry", "Endocrinology", "Diabetes", "Vitamins", "Health Packages", "Infectious Disease", "Pathology"];

export const orders: Order[] = [
  { id: "ORD-001", testName: "Complete Blood Count (CBC)", patientName: "Rahul Sharma", date: "2026-04-10", status: "completed", amount: 399, reportUrl: "#" },
  { id: "ORD-002", testName: "Lipid Profile", patientName: "Priya Patel", date: "2026-04-11", status: "processing", amount: 499 },
  { id: "ORD-003", testName: "Full Body Checkup", patientName: "Amit Kumar", date: "2026-04-11", status: "sample-collected", amount: 1999, prescriptionUrl: "#" },
  { id: "ORD-004", testName: "Thyroid Profile", patientName: "Sneha Gupta", date: "2026-04-12", status: "pending", amount: 649 },
  { id: "ORD-005", testName: "Vitamin D Total", patientName: "Vikram Singh", date: "2026-04-12", status: "pending", amount: 799, prescriptionUrl: "#" },
];

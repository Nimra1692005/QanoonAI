import { NextRequest, NextResponse } from 'next/server';

const cases = [
  { id: 'pk-001', title: 'Suo Motu Case — Tenant Rights', court: 'Supreme Court of Pakistan', year: '2019', citation: '2019 SCMR 1456', summary: 'Tenants cannot be evicted without court order. Police cannot assist in forcible eviction without legal directive under Rent Restriction Ordinance.', keywords: ['tenant', 'eviction', 'rent', 'property', 'rights'], area: 'Property Law', decision: 'Allowed' },
  { id: 'pk-002', title: 'Khan v. Khan — Custody of Minor Children', court: 'Lahore High Court', year: '2021', citation: '2021 PLD (Lahore) 234', summary: 'Welfare of the child is paramount. Mother has right of hizanat for sons up to 7 years and daughters until puberty.', keywords: ['custody', 'children', 'divorce', 'family', 'hizanat'], area: 'Family Law', decision: 'Remanded' },
  { id: 'pk-003', title: 'Ali Corporation v. Labour Court — Wrongful Termination', court: 'Sindh High Court', year: '2020', citation: '2020 CLC 1789', summary: 'Workers entitled to notice or wages in lieu on termination. Court ordered reinstatement or 3 months salary compensation.', keywords: ['labour', 'termination', 'wrongful', 'employment', 'wages'], area: 'Labour Law', decision: 'Allowed' },
  { id: 'pk-004', title: 'State v. Accused — Bail in Non-Bailable Offence', court: 'Islamabad High Court', year: '2022', citation: '2022 PCrLJ 567', summary: 'Prolonged detention without evidence violates Articles 9 and 10A. Bail should be the rule and jail the exception.', keywords: ['bail', 'criminal', 'FIR', 'arrest', 'detention'], area: 'Criminal Law', decision: 'Allowed' },
  { id: 'pk-005', title: 'Fatima v. Ahmed — Mehr and Maintenance', court: 'Federal Shariat Court', year: '2020', citation: '2020 PCrLJ FSC 89', summary: 'Mehr is mandatory right of wife, cannot be waived under duress. Maintenance includes food, clothing, and shelter.', keywords: ['mehr', 'maintenance', 'nafaqa', 'wife', 'divorce', 'family'], area: 'Family Law', decision: 'Allowed' },
  { id: 'pk-006', title: 'Consumer v. XYZ Telecom — Consumer Protection', court: 'Consumer Protection Court, Lahore', year: '2023', citation: '2023 CPC 123', summary: 'Consumers have right to accurate billing. Compensation awarded under Consumer Protection Act for unfair trade practices.', keywords: ['consumer', 'protection', 'telecom', 'overcharge', 'rights'], area: 'Consumer Law', decision: 'Allowed' },
  { id: 'pk-007', title: 'Property Developer v. Homebuyers — Real Estate Fraud', court: 'Supreme Court of Pakistan', year: '2021', citation: '2021 SCMR 2001', summary: 'Developers cannot sell plots without NOC. Purchasers entitled to refund with interest for fraud and misrepresentation.', keywords: ['property', 'fraud', 'housing', 'real estate', 'refund', 'NOC'], area: 'Property Law', decision: 'Allowed' },
  { id: 'pk-008', title: 'Writ Petition — Police Refusal to Register FIR', court: 'Lahore High Court', year: '2022', citation: '2022 PLD (Lahore) 456', summary: 'Police cannot refuse FIR for cognizable offences. SHO ordered departmental action for misconduct.', keywords: ['FIR', 'police', 'criminal', 'complaint', 'registration', 'SHO'], area: 'Criminal Law', decision: 'Allowed' },
  { id: 'pk-009', title: 'Inheritance Dispute — Muslim Personal Law', court: 'Peshawar High Court', year: '2019', citation: '2019 YLR 1234', summary: 'Daughters entitled to half share of sons under Islamic law. Customary denial of inheritance to daughters declared illegal.', keywords: ['inheritance', 'family', 'property', 'daughters', 'Islamic law', 'sharia'], area: 'Family Law', decision: 'Allowed' },
  { id: 'pk-010', title: 'Cyber Crime — Social Media Harassment', court: 'Special Court (Cyber Crimes), Karachi', year: '2023', citation: '2023 CLD Cyber 67', summary: 'Conviction under PECA 2016 for online harassment and stalking. 1 year imprisonment and Rs 1 million fine.', keywords: ['cyber', 'crime', 'harassment', 'social media', 'PECA', 'internet'], area: 'Cyber Law', decision: 'Dismissed' },
  { id: 'pk-011', title: 'Contract Dispute — Business Agreement', court: 'Lahore High Court', year: '2021', citation: '2021 CLD 890', summary: 'Valid contract requires offer, acceptance, and consideration. Verbal contracts enforceable with sufficient evidence.', keywords: ['contract', 'business', 'breach', 'damages', 'commercial', 'agreement'], area: 'Civil Law', decision: 'Allowed' },
  { id: 'pk-012', title: 'Khula Case — Judicial Dissolution of Marriage', court: 'Family Court, Islamabad', year: '2022', citation: '2022 FLD 345', summary: 'Court must dissolve marriage on grounds of cruelty even without husband\'s consent once khula is established.', keywords: ['khula', 'divorce', 'family', 'wife', 'marriage dissolution', 'cruelty'], area: 'Family Law', decision: 'Allowed' },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const court = searchParams.get('court') || '';
  const area = searchParams.get('area') || '';

  if (query.length < 2) {
    return NextResponse.json({ cases: [], total: 0, query });
  }

  const q = query.toLowerCase();
  let filtered = cases.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.summary.toLowerCase().includes(q) ||
    c.keywords.some(k => k.toLowerCase().includes(q)) ||
    c.area.toLowerCase().includes(q)
  );

  if (court) filtered = filtered.filter(c => c.court.toLowerCase().includes(court.toLowerCase()));
  if (area) filtered = filtered.filter(c => c.area.toLowerCase().includes(area.toLowerCase()));

  return NextResponse.json({ cases: filtered, total: filtered.length, query });
}

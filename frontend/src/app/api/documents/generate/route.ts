import { NextRequest, NextResponse } from 'next/server';

function today(): string {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatAmount(amount: string): string {
  try { return `PKR ${parseInt(amount).toLocaleString()}`; }
  catch { return `PKR ${amount}`; }
}

function rentalAgreement(data: Record<string, string>): string {
  return `RENTAL AGREEMENT / کرایہ نامہ
═══════════════════════════════════════════════════

Date: ${today()}   City: ${data.city || '[CITY]'}, Pakistan

LANDLORD (مالک مکان): ${data.landlord_name || '[LANDLORD]'}
TENANT (کرایہ دار):   ${data.tenant_name || '[TENANT]'}
Property Address:     ${data.property_address || '[ADDRESS]'}

TERMS:
1. Duration: ${data.duration_months || '12'} months from ${data.start_date || today()}
2. Monthly Rent: ${formatAmount(data.monthly_rent || '0')} (due by 5th of each month)
3. Security Deposit: ${formatAmount(data.security_deposit || '0')} (refundable)
4. Utilities: Tenant's responsibility
5. No subletting without written consent
6. One month notice required for termination
7. Governed by Rent Restriction Ordinance, Pakistan

SIGNATURES:
Landlord: ___________________________  Date: ________
${data.landlord_name || ''}

Tenant:   ___________________________  Date: ________
${data.tenant_name || ''}

Witness 1: _________________________  CNIC: ________
Witness 2: _________________________  CNIC: ________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Disclaimer: Consult a lawyer for legal validity. Get stamped.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function affidavit(data: Record<string, string>): string {
  return `AFFIDAVIT / حلف نامہ
═══════════════════════════════════════════════════

I, ${data.deponent_name || '[NAME]'},
S/D/O: ${data.father_name || '[FATHER NAME]'}
CNIC: ${data.cnic || '[CNIC]'}
Address: ${data.address || '[ADDRESS]'}

DO HEREBY SOLEMNLY AFFIRM AND DECLARE THAT:

1. I am an adult Pakistani citizen competent to execute this Affidavit.
2. ${data.purpose || '[PURPOSE]'}
3. All facts stated are true and correct to the best of my knowledge.
4. Nothing has been concealed or misrepresented herein.

Deponent: ___________________________
${data.deponent_name || ''}
Date: ${today()}   Place: ${data.city || '[CITY]'}

SWORN BEFORE ME:
___________________________
Oath Commissioner / Notary Public
Date: ${today()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Must be sworn on stamp paper before Oath Commissioner.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function powerOfAttorney(data: Record<string, string>): string {
  return `POWER OF ATTORNEY / وکالت نامہ
═══════════════════════════════════════════════════

I, ${data.grantor_name || '[GRANTOR]'} (CNIC: ${data.grantor_cnic || '[CNIC]'})
hereby appoint:
${data.attorney_name || '[ATTORNEY]'} (CNIC: ${data.attorney_cnic || '[CNIC]'})
as my Attorney-in-Fact.

POWERS GRANTED:
${data.powers_granted || '[POWERS]'}

General Powers: Execute documents, represent before courts/govt departments,
collect dues, and perform all acts necessary for above purposes.

This POA is valid until revoked in writing.

Executed at ${data.city || '[CITY]'} on ${today()}.

Principal: ___________________________
${data.grantor_name || ''}  CNIC: ${data.grantor_cnic || ''}

Attorney: ___________________________
${data.attorney_name || ''}  CNIC: ${data.attorney_cnic || ''}

Witness 1: _________________________
Witness 2: _________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Execute on stamp paper. Register if involving property.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function employmentContract(data: Record<string, string>): string {
  return `EMPLOYMENT CONTRACT / ملازمت معاہدہ
═══════════════════════════════════════════════════

Date: ${today()}

EMPLOYER: ${data.employer_name || '[EMPLOYER]'}
EMPLOYEE: ${data.employee_name || '[EMPLOYEE]'}

TERMS:
1. Position: ${data.designation || '[DESIGNATION]'}
2. Start Date: ${data.start_date || today()}
3. Monthly Salary: ${formatAmount(data.monthly_salary || '0')}
4. Working Hours: 8 hrs/day, 5 days/week
5. Probation: 3 months (7 days notice during probation)
6. Annual Leave: 14 days | Sick Leave: 10 days
7. Termination: 30 days written notice or salary in lieu
8. Governed by Industrial Relations Act 2012, Pakistan

Employer: ___________________________  Date: ________
${data.employer_name || ''}

Employee: ___________________________  Date: ________
${data.employee_name || ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Complies with Pakistan Labour Laws.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function saleDeed(data: Record<string, string>): string {
  return `SALE DEED / فروخت نامہ
═══════════════════════════════════════════════════

Date: ${today()}   Place: ${data.city || '[CITY]'}, Pakistan

SELLER (فروخت کنندہ): ${data.seller_name || '[SELLER]'}
BUYER (خریدار):       ${data.buyer_name || '[BUYER]'}

PROPERTY: ${data.property_description || '[PROPERTY]'}

TERMS:
1. Sale Price: ${formatAmount(data.sale_price || '0')} (paid in full, receipt acknowledged)
2. Possession transferred on ${today()}
3. Seller warrants free title, no encumbrances
4. Governed by Transfer of Property Act 1882, Pakistan

Seller: ___________________________  CNIC: ________
${data.seller_name || ''}  Date: ${today()}

Buyer:  ___________________________  CNIC: ________
${data.buyer_name || ''}  Date: ${today()}

Witness 1: _________________________  CNIC: ________
Witness 2: _________________________  CNIC: ________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT: Register with Sub-Registrar on stamp paper.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

export async function POST(req: NextRequest) {
  try {
    const { document_type, form_data } = await req.json();

    const generators: Record<string, (d: Record<string, string>) => string> = {
      rental_agreement: rentalAgreement,
      affidavit: affidavit,
      power_of_attorney: powerOfAttorney,
      employment_contract: employmentContract,
      sale_deed: saleDeed,
    };

    const generator = generators[document_type];
    if (!generator) {
      return NextResponse.json({ error: 'Unknown document type' }, { status: 400 });
    }

    const document = generator(form_data || {});
    return NextResponse.json({ document, document_type, language: 'en' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

"""
Document Service — Legal document generation
"""
import logging
from datetime import datetime, date
from typing import Any, Dict

logger = logging.getLogger(__name__)


def _today() -> str:
    return date.today().strftime("%d %B %Y")


def _format_amount(amount: str) -> str:
    """Format a numeric amount with commas."""
    try:
        return f"PKR {int(amount):,}"
    except (ValueError, TypeError):
        return f"PKR {amount}"


class DocumentService:
    """Service for generating legal documents."""

    async def generate(
        self,
        document_type: str,
        form_data: Dict[str, Any],
        language: str = "en",
    ) -> str:
        """
        Generate a legal document based on type and form data.

        Args:
            document_type: Type of document to generate
            form_data: Dictionary of form field values
            language: 'en' or 'ur'

        Returns:
            Generated document as a string
        """
        generators = {
            "rental_agreement": self._rental_agreement,
            "affidavit": self._affidavit,
            "power_of_attorney": self._power_of_attorney,
            "employment_contract": self._employment_contract,
            "sale_deed": self._sale_deed,
        }

        generator = generators.get(document_type)
        if not generator:
            raise ValueError(f"Unknown document type: {document_type}")

        logger.info(f"Generating {document_type} document in {language}")
        return generator(form_data)

    def _rental_agreement(self, data: Dict[str, Any]) -> str:
        landlord = data.get("landlord_name", "[LANDLORD NAME]")
        tenant = data.get("tenant_name", "[TENANT NAME]")
        address = data.get("property_address", "[PROPERTY ADDRESS]")
        rent = _format_amount(data.get("monthly_rent", "0"))
        duration = data.get("duration_months", "12")
        start_date = data.get("start_date", _today())
        deposit = _format_amount(data.get("security_deposit", "0"))
        city = data.get("city", "[CITY]")

        return f"""
RENTAL AGREEMENT / کرایہ نامہ
═══════════════════════════════════════════════════════════════

Date: {_today()}
City: {city}, Pakistan

PARTIES / فریقین
───────────────────────────────────────────────────────────────
LANDLORD (مالک مکان): {landlord}
TENANT (کرایہ دار): {tenant}

PROPERTY DETAILS / جائیداد کی تفصیل
───────────────────────────────────────────────────────────────
Property Address: {address}

TERMS AND CONDITIONS / شرائط و ضوابط
───────────────────────────────────────────────────────────────

1. TENANCY PERIOD (مدت کرایہ داری):
   This agreement is for a period of {duration} months,
   commencing from {start_date}.

2. MONTHLY RENT (ماہانہ کرایہ):
   The monthly rent shall be {rent}, payable in advance
   by the 5th of each month.

3. SECURITY DEPOSIT (سیکیورٹی ڈپازٹ):
   A security deposit of {deposit} has been paid by the Tenant,
   refundable at the end of the tenancy upon satisfactory
   inspection of the property.

4. UTILITIES (یوٹیلیٹیز):
   The Tenant shall be responsible for all utility bills
   including electricity, gas, water, and telephone.

5. MAINTENANCE (دیکھ بھال):
   The Tenant shall maintain the property in good condition and
   shall not make any structural changes without written consent
   of the Landlord.

6. SUBLETTING (ذیلی کرایہ):
   The Tenant shall not sublet or transfer the property without
   prior written consent of the Landlord.

7. TERMINATION (معاہدہ ختم کرنا):
   Either party may terminate this agreement with one month's
   written notice. In case of breach, the Landlord may
   terminate immediately.

8. GOVERNING LAW (قانون):
   This agreement is governed by the Rent Restriction Ordinance
   and applicable laws of Pakistan.

9. DISPUTE RESOLUTION (تنازعہ حل):
   Any disputes arising from this agreement shall be resolved
   through the Rent Controller Court of {city}.

SIGNATURES / دستخط
───────────────────────────────────────────────────────────────

LANDLORD (مالک مکان):                TENANT (کرایہ دار):

___________________________          ___________________________
{landlord}                           {tenant}

Date: _______________                Date: _______________


WITNESS 1 (گواہ ۱):                  WITNESS 2 (گواہ ۲):

___________________________          ___________________________
Name:                                Name:
CNIC:                                CNIC:

═══════════════════════════════════════════════════════════════
DISCLAIMER: This document is generated for informational purposes.
For legal validity, please have this agreement stamped and
registered with the relevant authority, and consult a lawyer.
تنبیہ: یہ دستاویز معلوماتی مقاصد کے لیے تیار کی گئی ہے۔
قانونی اعتبار کے لیے کسی وکیل سے مشورہ کریں۔
═══════════════════════════════════════════════════════════════
""".strip()

    def _affidavit(self, data: Dict[str, Any]) -> str:
        deponent = data.get("deponent_name", "[DEPONENT NAME]")
        father = data.get("father_name", "[FATHER'S NAME]")
        cnic = data.get("cnic", "[CNIC]")
        address = data.get("address", "[ADDRESS]")
        purpose = data.get("purpose", "[PURPOSE OF AFFIDAVIT]")
        city = data.get("city", "[CITY]")

        return f"""
AFFIDAVIT / حلف نامہ
═══════════════════════════════════════════════════════════════

IN THE MATTER OF: {purpose[:80]}...

I, {deponent}, son/daughter of {father},
holder of CNIC No. {cnic},
resident of {address},

DO HEREBY SOLEMNLY AFFIRM AND DECLARE THAT:

1. I am an adult Pakistani citizen, competent to execute this
   Affidavit.

2. {purpose}

3. All the facts stated in this Affidavit are true and correct
   to the best of my knowledge and belief.

4. I am executing this Affidavit for the purpose of record and
   legal documentation.

5. Nothing has been concealed or misrepresented herein.

DEPONENT
___________________________
{deponent}
S/O or D/O: {father}
CNIC: {cnic}
Date: {_today()}
Place: {city}


VERIFICATION / تصدیق
───────────────────────────────────────────────────────────────
Verified on oath at {city} on {_today()} that the contents of
this Affidavit are true and correct to my knowledge and belief
and nothing has been concealed therein.

___________________________
{deponent}
(Deponent)


SWORN/AFFIRMED BEFORE ME
───────────────────────────────────────────────────────────────

___________________________
Oath Commissioner / Notary Public
Date: {_today()}
Place: {city}

═══════════════════════════════════════════════════════════════
Note: This Affidavit must be sworn before a competent Oath
Commissioner, Magistrate, or Notary Public on stamp paper of
appropriate value. Consult a lawyer for proper execution.
═══════════════════════════════════════════════════════════════
""".strip()

    def _power_of_attorney(self, data: Dict[str, Any]) -> str:
        grantor = data.get("grantor_name", "[GRANTOR NAME]")
        grantor_cnic = data.get("grantor_cnic", "[GRANTOR CNIC]")
        attorney = data.get("attorney_name", "[ATTORNEY NAME]")
        attorney_cnic = data.get("attorney_cnic", "[ATTORNEY CNIC]")
        powers = data.get("powers_granted", "[POWERS GRANTED]")
        city = data.get("city", "[CITY]")

        return f"""
POWER OF ATTORNEY / وکالت نامہ
(General / عمومی)
═══════════════════════════════════════════════════════════════

KNOW ALL PERSONS BY THESE PRESENTS that I,

{grantor}
CNIC No: {grantor_cnic}
(hereinafter referred to as the "PRINCIPAL")

Do hereby nominate, constitute, and appoint:

{attorney}
CNIC No: {attorney_cnic}
(hereinafter referred to as the "ATTORNEY-IN-FACT")

As my true and lawful Attorney-in-Fact to act in my name,
place, and stead, for the following purposes:

POWERS GRANTED / دیے گئے اختیارات:
───────────────────────────────────────────────────────────────
{powers}

GENERAL POWERS:
I hereby grant my Attorney-in-Fact full power and authority to:
1. Execute documents, sign papers, and give receipts on my behalf
2. Represent me before all government departments and courts
3. Collect monies, rents, dues, and debts owing to me
4. Take all such acts as may be necessary for the above purposes

RATIFICATION:
I hereby ratify and confirm all that my Attorney-in-Fact shall
lawfully do or cause to be done by virtue of these presents.

This Power of Attorney shall remain valid until revoked by me
in writing.

IN WITNESS WHEREOF, I have signed this Power of Attorney at
{city} on {_today()}.


PRINCIPAL (دینے والے):
___________________________
{grantor}
CNIC: {grantor_cnic}
Date: {_today()}


WITNESSES / گواہان:

WITNESS 1:                           WITNESS 2:
___________________________          ___________________________
Name:                                Name:
CNIC:                                CNIC:
Date:                                Date:


ACCEPTED BY ATTORNEY-IN-FACT:
___________________________
{attorney}
CNIC: {attorney_cnic}
Date: {_today()}

═══════════════════════════════════════════════════════════════
IMPORTANT: This Power of Attorney should be executed on
appropriate stamp paper, attested by a Notary Public or
Oath Commissioner, and registered if involving immovable
property. Please consult a lawyer.
═══════════════════════════════════════════════════════════════
""".strip()

    def _employment_contract(self, data: Dict[str, Any]) -> str:
        employer = data.get("employer_name", "[EMPLOYER NAME]")
        employee = data.get("employee_name", "[EMPLOYEE NAME]")
        designation = data.get("designation", "[DESIGNATION]")
        salary = _format_amount(data.get("monthly_salary", "0"))
        start_date = data.get("start_date", _today())
        city = data.get("city", "[CITY]")

        return f"""
EMPLOYMENT CONTRACT / ملازمت معاہدہ
═══════════════════════════════════════════════════════════════

Date: {_today()}

This Employment Contract is entered into between:

EMPLOYER (آجر): {employer}
                (hereinafter referred to as the "Company")

AND

EMPLOYEE (ملازم): {employee}
                  (hereinafter referred to as the "Employee")

TERMS OF EMPLOYMENT / ملازمت کی شرائط:
───────────────────────────────────────────────────────────────

1. POSITION (عہدہ):
   The Employee is hereby employed as: {designation}

2. COMMENCEMENT DATE (آغاز کی تاریخ):
   The employment shall commence from: {start_date}

3. COMPENSATION (معاوضہ):
   Monthly Salary: {salary}
   Salary shall be paid by the last working day of each month.

4. WORKING HOURS (کام کے اوقات):
   Standard working hours: 8 hours per day, 5 days per week
   (Monday to Friday), as per company policy.

5. PROBATION PERIOD (آزمائشی مدت):
   The first 3 months shall be considered probation period,
   during which either party may terminate with 7 days notice.

6. LEAVE ENTITLEMENTS (چھٹیاں):
   Annual Leave: 14 days per year
   Sick Leave: 10 days per year
   As per the applicable Labour Laws of Pakistan.

7. CONFIDENTIALITY (رازداری):
   The Employee agrees to maintain confidentiality of all
   company information during and after employment.

8. TERMINATION (برطرفی):
   Either party may terminate this contract with 30 days'
   written notice or payment in lieu thereof, as per the
   Industrial & Commercial Employment Ordinance.

9. GOVERNING LAW (قانون):
   This contract is governed by the labour laws of Pakistan,
   including the Industrial Relations Act 2012.

SIGNATURES / دستخط:
───────────────────────────────────────────────────────────────

EMPLOYER:                            EMPLOYEE:

___________________________          ___________________________
{employer}                           {employee}
Authorized Signatory                 Date: {_today()}

═══════════════════════════════════════════════════════════════
This contract complies with Pakistan Labour Laws. Consult an
HR/Legal professional for industry-specific requirements.
═══════════════════════════════════════════════════════════════
""".strip()

    def _sale_deed(self, data: Dict[str, Any]) -> str:
        seller = data.get("seller_name", "[SELLER NAME]")
        buyer = data.get("buyer_name", "[BUYER NAME]")
        property_desc = data.get("property_description", "[PROPERTY DESCRIPTION]")
        price = _format_amount(data.get("sale_price", "0"))
        city = data.get("city", "[CITY]")

        return f"""
SALE DEED / فروخت نامہ
═══════════════════════════════════════════════════════════════

Date: {_today()}
Place: {city}, Pakistan

This Sale Deed is executed between:

SELLER (فروخت کنندہ): {seller}
                      (hereinafter called the "Vendor")

AND

BUYER (خریدار): {buyer}
                (hereinafter called the "Vendee")

PROPERTY DESCRIPTION / جائیداد کی تفصیل:
───────────────────────────────────────────────────────────────
{property_desc}

TERMS OF SALE / فروخت کی شرائط:
───────────────────────────────────────────────────────────────

1. SALE CONSIDERATION (فروخت قیمت):
   The total sale consideration agreed upon is: {price}

2. PAYMENT (ادائیگی):
   The Vendee has paid the full sale consideration of {price}
   to the Vendor, receipt of which is hereby acknowledged.

3. TRANSFER OF TITLE (عنوان کی منتقلی):
   The Vendor hereby transfers, conveys, and assigns all rights,
   title, and interest in the above-described property to the
   Vendee, their heirs and assigns forever.

4. POSSESSION (قبضہ):
   Physical possession of the property is hereby handed over
   to the Vendee on {_today()}.

5. WARRANTY OF TITLE (عنوان کی ضمانت):
   The Vendor warrants that:
   a) They are the lawful owner of the property
   b) The property is free from all encumbrances, mortgages,
      and liabilities
   c) They have full authority to sell the property

6. GOVERNING LAW:
   This deed is governed by the Transfer of Property Act 1882
   and applicable laws of Pakistan.

SIGNATURES / دستخط:
───────────────────────────────────────────────────────────────

VENDOR (فروخت کنندہ):                VENDEE (خریدار):

___________________________          ___________________________
{seller}                             {buyer}
CNIC:                                CNIC:
Date: {_today()}                     Date: {_today()}


WITNESSES / گواہان:

WITNESS 1:                           WITNESS 2:
___________________________          ___________________________
Name:                                Name:
CNIC:                                CNIC:

═══════════════════════════════════════════════════════════════
IMPORTANT: This Sale Deed must be executed on appropriate stamp
paper, registered with the relevant Sub-Registrar's office, and
should be prepared/reviewed by a qualified lawyer/property
conveyancer. This template is for guidance only.
═══════════════════════════════════════════════════════════════
""".strip()

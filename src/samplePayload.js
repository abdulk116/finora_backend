// "Create Loan"
// POST /api/v1/loans
const addLoanPayload = {
  "loanName": "Education Loan",

  "lender": "SBI",

  "loanType": "EDUCATION",

  "principalAmount": 96000,

  "outstandingAmount": 96000,

  "interestRate": 9.5,

  "emiAmount": 3200,

  "emiDay": 15,

  "startDate": "2025-01-15",

  "notes": "College Loan"
}

// get loans
//GET /api/v1/loans

// get loan
// GET /api/v1/loans/:id

// update loan
//PATCH /api/v1/loans/:id

// delete loan
// DELETE /api/v1/loans/:id
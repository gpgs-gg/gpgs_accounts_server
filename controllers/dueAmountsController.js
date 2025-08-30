const { GoogleSpreadsheet } = require("google-spreadsheet");

const fetchPropertySheetData = async (req, res) => {
  const value = req.query.sheetId || "1shI8qMMPkmKN9kI03tOpgu5lf-UCi1HvU9rRNZ4jd2A"; // Default sheetId
  const [spreadsheetId] = value.split(",");

  const sheetTitle = new Date().toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  }).replace(" ", "");

  if (!spreadsheetId) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);

    // Authenticate using service account
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load the document information
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetTitle];
    if (!sheet) {
      return res.status(404).json({ success: false, message: "Sheet not found" });
    }

    // Load the rows (no row count limitation here)
    const rows = await sheet.getRows();

    const result = [];

    // Iterate over all rows and extract data, skipping empty rows
    for (const row of rows) {

      const CurDueAmt = row['CurDueAmt'] || '';
      const DADue = row['DADue']?.toString().trim() || '';
      const FullName = row['FullName']?.toString().trim() || '';
      const PreDueAmt = row['PreDueAmt']?.toString().trim() || '';
      const ToRcableAmt = row['ToRcableAmt']?.toString().trim() || '';

      // Check if the relevant columns have non-empty values
      if ( FullName || CurDueAmt || DADue || PreDueAmt || ToRcableAmt ) {
        result.push({
          CurDueAmt: CurDueAmt,
          DADue: DADue,
          FullName: FullName,
          PreDueAmt: PreDueAmt,
          ToRcableAmt: ToRcableAmt
        });
      }
    }

    // Return the fetched data
    return res.json({ success: true, total: result.length, data: result });

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

module.exports = {
  fetchPropertySheetData,
};

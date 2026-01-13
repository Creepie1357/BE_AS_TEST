export default async function handler(req, res) {
  const { tableName, action, rows } = req.body;
  
  const appId = process.env.APPSHEET_APP_ID;
  const accessKey = process.env.APPSHEET_ACCESS_KEY;

  const url = `https://api.appsheet.com/api/v2/apps/${appId}/tables/${tableName}/Action`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'ApplicationAccessKey': accessKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Action": action || "Find",
        "Properties": { "Locale": "ru-RU" },
        "Rows": rows || []
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
}
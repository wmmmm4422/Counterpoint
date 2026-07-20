export default async function handler(req, res) {
  try {
    const { query } = req.body;
    const URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_KEY}&cx=b0857b3093faa4f44&q=${query}&searchType=image&num=10`;

    const result = await fetch(URL).then((response) => response.json());

    console.log(result);

    res.status(200).json(result.items);
  } catch (e) {
    console.log(e);
  }
}

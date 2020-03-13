import Axios from "axios";

export default async (req, res) => {
  const amount = req.body.amount;
  const response = await Axios({
    url:
      "https://prime.exchangerate-api.com/v5/753c3bc80456ba4e32b02302/latest/CZK"
  });
  const Euro = response.data.conversion_rates.EUR;
  console.log(Euro);

  const FullAmount = Number(Math.round(Euro * amount + "e2") + "e-2");

  res.send({ FullAmount });
};

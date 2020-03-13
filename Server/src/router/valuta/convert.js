import Axios from "axios";
import NodeCache from "node-cache";
const myCache = new NodeCache();

export default async (req, res) => {
  let Euro = 0;
  const amount = req.body.amount;

  const cache = myCache.get("Euro");
  if (cache == undefined) {
    const response = await Axios({
      url:
        "https://prime.exchangerate-api.com/v5/753c3bc80456ba4e32b02302/latest/CZK"
    });
    Euro = response.data.conversion_rates.EUR;
    myCache.set("Euro", Euro, 60 * 60);
  } else {
    Euro = cache;
  }

  const FullAmount = Number(Math.round(Euro * amount + "e2") + "e-2");

  res.send({ FullAmount });
};

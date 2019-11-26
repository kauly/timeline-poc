import * as R from "ramda";
import * as moment from "moment";

import { data } from "./trips";

const iWanna = [
  "id",
  "begin_at",
  "end_at",
  "begin_at_address",
  "end_at_address",
  "idle_time",
  "duration",
  "total_distance"
];
const dateFormat = "YYYY-MM-DD hh:mm:ss";
const types = ["weird", "move", "stop"];

const randomType = () => Math.round(Math.random() * 2);
const toDateObj = date => moment(date, dateFormat).toDate();
const item = R.pick(iWanna);
const itemWDate = data => ({
  ...data,
  begin_at: toDateObj(data.begin_at),
  end_at: toDateObj(data.end_at),
  type: types[randomType()]
});

export const cleanDate = () =>
  R.pipe(R.map(item), R.map(itemWDate))(data.trips);

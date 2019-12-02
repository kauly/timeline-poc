import * as R from "ramda";
import * as moment from "moment";
moment.locale("pt-BR");
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
const timeFormat = "hh:mm:ss";
export const toMoment = date => moment(date).format(timeFormat);
export const types = ["weird", "move", "stop"];
export const colors = ["#eb4d4b", "#6ab04c", "#f0932b"];
export const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
export const resetTime = d =>
  moment(d)
    .year(1987)
    .month(7)
    .date(2)
    .toDate();

export const begin = moment("02/08/1987", "DD/MM/YYYY").startOf("day");
export const end = moment("02/08/1987", "DD/MM/YYYY").endOf("day");

export const genPoints = (d, scaleX, scaleY) => {
  const x_1 = scaleX(resetTime(d.begin_at));
  const x_2 = scaleX(resetTime(d.end_at));
  const y_1 =
    scaleY(moment(d.begin_at).format("ddd")) - scaleY.bandwidth() * 0.5 - 2;
  const y_2 = y_1 + scaleY.bandwidth();
  const points = {
    p_1: `${x_1},${y_1}`,
    p_2: `${x_2},${y_1}`,
    p_3: `${x_2},${y_2}`,
    p_4: `${x_1},${y_2}`,
    p_5: `${x_1},${y_1}`
  };

  return {
    points,
    coord: `${points.p_1} ${points.p_2} ${points.p_3} ${points.p_4} ${points.p_5}`
  };
};

const randomType = () => Math.round(Math.random() * 2);
const toDateObj = date => moment(date, dateFormat).toDate();
const item = R.pick(iWanna);
const itemWDate = data => ({
  ...data,
  begin_at: toDateObj(data.begin_at),
  end_at: toDateObj(data.end_at),
  type: types[randomType()]
});

export const cleanData = () =>
  R.pipe(R.map(item), R.map(itemWDate))(data.trips);

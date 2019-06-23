import characteristics, { Characteristics } from "./characteristics";

export interface Services {
  a000: Service;
}

export interface Service {
  uuid: string;
  name: null;
  type: null;
  characteristics: Characteristics;
}

const services: Services = {
  a000: {
    uuid: "a000",
    name: null,
    type: null,
    characteristics: characteristics
  }
};

export default services;

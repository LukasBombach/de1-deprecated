import { Keys, Values } from "./converters";

export type Events = Keys;
export type EventValues<Key extends Keys> = Values<Key>;
export type Listener<E extends Events> = (value: EventValues<E>) => void;

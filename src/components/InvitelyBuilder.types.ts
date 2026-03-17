export type Template =
  | "elegant"
  | "minimal"
  | "bold"
  | "whimsy"
  | "botanical"
  | "editorial";

export type Occasion =
  | "birthday"
  | "wedding"
  | "dinner"
  | "baby"
  | "corporate"
  | "graduation";

export type Fields = {
  title: string;
  host: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  dress: string;
  rsvp: string;
};

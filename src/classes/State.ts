export enum SwitchType {
  harbor = "harbor",
  medical = "medical",
  rescue = "rescue",
  srr = "srr",
  transfer = "transfer"
}

// State class which keeps the current state of the application
export class State {
  minDate = new Date(2016, 0, 1);
  maxDate = new Date();
  switch: { [key in SwitchType]: boolean } = {
    rescue: true,
    transfer: true,
    medical: true,
    harbor: true,
    srr: true
  };
}

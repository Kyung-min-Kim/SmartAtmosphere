export interface RoutineDeviceState {
  deviceId: string;
  name: string;
  icon: string;
  state: "on" | "off";
}

export interface RoutineFeeling {
  emoji: string; // 😊
  description: string; // "행복"
}

export interface RoutineMusic {
  genre: string; // "jazz"
  title: string; // "Evening Jazz"
}

export interface RoutineColor {
  hex: string; // "#FFAA33"
}

export interface Routine {
  id: string;
  title: string;
  time: string; // "21:00"
  location: string; // "우리집"
  weather: string; // "27°C"
  humidity: string; // "60%"
  feeling: RoutineFeeling;
  devices: RoutineDeviceState[];
  music?: RoutineMusic;
  color?: RoutineColor;
  createdAt: string;
}

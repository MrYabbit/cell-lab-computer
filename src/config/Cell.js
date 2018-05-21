export const MAX_ENERGY = 100;
export const MIN_ENERGY = 5;
export const COLOR_STROKE = "#000000";
export const COLOR_FILL = "#00FF00";
export const MAX_GROWTH = 30;
export const REPRODUCE_ENERGY = 90;
export const STARVE_RATE = 1;
export const SPLIT_ANGLE = 0;


export const ANGLE_LINE_LEN = 0.75; // this is len of that line on each cell
export const ANGLE_LINE_WIDTH = 2; // width of that line
export const ANGLE_LINE_COLOR = "#0000FF"; // color of that line

export const WEIGHT_FROM_ENERGY_CONST = 1/10; // This is the multiplier of energy to get weight
export const RADIUS_MULTIPLIER = 2; // Radius is computed as Math.sqrt(energy) * RADIUS_MULTIPLIER

export const COLLISION_MOVE_INSTANTLY_MULTIPLIER = 20;
export const COLLISION_PUSH_MULTIPLIER = 1000;
export const BORDER_COLLISION_MULTIPLIER = COLLISION_PUSH_MULTIPLIER;

export const MOVEMENT_FRICTION_COEF = 1;
export const ROTATION_FRICTION_COEF = 100000;

export const CONNECTION_MAX_LEN_DIFFERENCE = 0.6; // This is maximal allowed gap between border of cells
export const CONNECTION_COLOR = "#232629";
export const PART_VISIBLE = 0.4; // This is len of that middle part of the connection that is vidible
export const CONNECTION_WIDTH = 4; // Width of connection in pixels

// Force when stretching gaps will be computed as Math.pow(gap, STRETCH_GAP_POWER) * STRETCH_MULTIPLIER where:
export const STRETCH_GAP_POWER = 0.7;
export const STRETCH_MULTIPLIER = 5;

// Forces for rotating and moving cells will be computed using those:
export const PUSH_FORCE_MULTIPLIER = 1/100; // Moving will be multiplied by this
export const ROTATE_MULTIPLIER = 100; // Rotation will be multiplied by this

export const MAX_ANGLE_DIFFERENCE = Math.PI*2;
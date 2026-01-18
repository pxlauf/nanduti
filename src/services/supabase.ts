import { createClient } from '@supabase/supabase-js';
import { Stop, Line, RouteStop, LinePolyline } from '@types';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all stops from the database
 * @returns Array of stops
 */
export async function fetchAllStops(): Promise<Stop[]>;

/**
 * Fetch a single stop by ID
 * @param id Stop ID
 * @returns Stop or null
 */
export async function fetchStopById(id: number): Promise<Stop | null>;

/**
 * Search stops by name
 * @param query Search query
 * @returns Array of matching stops
 */
export async function searchStops(query: string): Promise<Stop[]>;

/**
 * Fetch all lines from the database
 * @returns Array of lines
 */
export async function fetchAllLines(): Promise<Line[]>;

/**
 * Fetch a single line by ID
 * @param id Line ID
 * @returns Line or null
 */
export async function fetchLineById(id: number): Promise<Line | null>;

/**
 * Fetch all routes for a line
 * @param lineId Line ID
 * @returns Array of route stops in order
 */
export async function fetchRoutesByLine(lineId: number): Promise<RouteStop[]>;

/**
 * Fetch polyline geometry for a line
 * @param lineId Line ID
 * @returns LinePolyline or null
 */
export async function fetchPolylineByLine(lineId: number): Promise<LinePolyline | null>;

/**
 * Fetch all polylines
 * @returns Array of line polylines
 */
export async function fetchAllPolylines(): Promise<LinePolyline[]>;

/**
 * Fetch lines that serve a specific stop
 * @param stopId Stop ID
 * @returns Array of lines
 */
export async function fetchLinesByStop(stopId: number): Promise<Line[]>;

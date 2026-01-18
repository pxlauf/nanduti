import { createClient } from '@supabase/supabase-js';
import { Stop, Line, RouteStop, LinePolyline } from '../types';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  // Silently handle missing credentials
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchAllStops(): Promise<Stop[]> {
  const { data, error } = await supabase
    .from('stops')
    .select('*')
    .order('name');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchStopById(id: number): Promise<Stop | null> {
  const { data, error } = await supabase
    .from('stops')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function searchStops(query: string): Promise<Stop[]> {
  const { data, error } = await supabase
    .from('stops')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(20);

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchAllLines(): Promise<Line[]> {
  const { data, error } = await supabase
    .from('lines')
    .select('*')
    .order('id');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchLineById(id: number): Promise<Line | null> {
  const { data, error } = await supabase
    .from('lines')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function fetchRoutesByLine(lineId: number): Promise<RouteStop[]> {
  const { data, error } = await supabase
    .from('routes')
    .select('*, stop:stops(*)')
    .eq('line_id', lineId)
    .order('order');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchPolylineByLine(lineId: number): Promise<LinePolyline | null> {
  const { data, error } = await supabase
    .from('line_polylines')
    .select('*')
    .eq('line_id', lineId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function fetchAllPolylines(): Promise<LinePolyline[]> {
  const { data, error } = await supabase
    .from('line_polylines')
    .select('*')
    .order('line_id');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchLinesByStop(stopId: number): Promise<Line[]> {
  const { data, error } = await supabase
    .from('routes')
    .select('line:lines(*)')
    .eq('stop_id', stopId);

  if (error) {
    throw error;
  }

  return data?.map((r: any) => r.line).filter((l: any) => l) || [];
}

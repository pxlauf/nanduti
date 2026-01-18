import { createClient } from '@supabase/supabase-js';
import { BusStop, Route, Line } from '../types';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getStops = async (): Promise<BusStop[]> => {
  const { data, error } = await supabase
    .from('stops')
    .select('*');

  if (error) {
    console.error('Error fetching stops:', error);
    return [];
  }

  return data || [];
};

export const getRoutes = async (): Promise<Route[]> => {
  const { data, error } = await supabase
    .from('routes')
    .select('*');

  if (error) {
    console.error('Error fetching routes:', error);
    return [];
  }

  return data || [];
};

export const getLines = async (): Promise<Line[]> => {
  const { data, error } = await supabase
    .from('lines')
    .select('*');

  if (error) {
    console.error('Error fetching lines:', error);
    return [];
  }

  return data || [];
};

export const searchStops = async (query: string): Promise<BusStop[]> => {
  const { data, error } = await supabase
    .from('stops')
    .select('*')
    .ilike('name', `%${query}%`);

  if (error) {
    console.error('Error searching stops:', error);
    return [];
  }

  return data || [];
};

export const searchRoutes = async (query: string): Promise<Route[]> => {
  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .ilike('name', `%${query}%`);

  if (error) {
    console.error('Error searching routes:', error);
    return [];
  }

  return data || [];
};

export const getRouteDetails = async (routeId: string): Promise<Route | null> => {
  const { data, error } = await supabase
    .from('routes')
    .select('*, stops(*)')
    .eq('id', routeId)
    .single();

  if (error) {
    console.error('Error fetching route details:', error);
    return null;
  }

  return data || null;
};

export const getStopDetails = async (stopId: string): Promise<BusStop | null> => {
  const { data, error } = await supabase
    .from('stops')
    .select('*, lines(*)')
    .eq('id', stopId)
    .single();

  if (error) {
    console.error('Error fetching stop details:', error);
    return null;
  }

  return data || null;
};
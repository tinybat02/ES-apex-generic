import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  threshold: number;
}

export const defaults: PanelOptions = {
  threshold: 60,
};

export interface Buffer extends Vector {
  buffer: any;
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}

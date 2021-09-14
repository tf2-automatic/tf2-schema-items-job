export interface TF2SchemaItemsResponse {
  result: {
    status: 0 | 1;
    note?: string;
    items?: TF2SchemaItem[];
    next?: number;
  };
}

export interface TF2SchemaItem {
  name: string;
  defindex: number;
  item_class: string;
  item_type_name: string;
  item_name: string;
  proper_name: boolean;
  item_slot: string | null;
  item_quality: number;
  min_ilevel: number;
  max_ilevel: number;
  image_url: string | null;
  image_url_large: string | null;
  capabilities: { [key: string]: string };
  used_by_classes: string[] | null;
}

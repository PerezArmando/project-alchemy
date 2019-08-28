export interface Column {
    key: string;
    label: string;
}

export interface Dimensions {
    height?: string;
    width?: string;
}

export interface Row {
    id?: number | string;
    checked?: boolean;
}

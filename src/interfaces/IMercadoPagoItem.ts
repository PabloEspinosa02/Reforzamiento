export interface IMercadoPagoItem {
    id:     string;
    title:  string;
    quantity:   number;
    unitPrice:  number;
    description: string;
    pictureUrl : string;
    currency_id?:   string;
}
export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    slug?: string;
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    details?: string;
    tags?: string[];
    link?: string;
    image?: string;
    links?: Array<{
        label: string;
        url: string;
    }>;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}

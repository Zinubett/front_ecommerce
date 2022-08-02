enum modeVenteProps {
    1 = "E",
    2 = "S",
    3 = "L"
}
enum modePaiementProps {
    1 = "ES",
    2 = "CB",
    3 = "CF"
}

// enum changer mode de paiementProps to enum comme constante


type ShopItemProps = {
    shop_id: number;
    designation: string;
    adresse: string;
    tel: string;
    image: string;
    couleur: string;
    logo: string;


};

type Store = {
    Designation: string;
    Listshop: ShopItemProps[];
}

type FranchiseProps = {
    iuud: uuid;
    designation: string;
    listshopid: {};
    logo: string;
    couleur: string;
};

type logoProps = {
    logo: string;
}

type heurs = {
    debut: number[];
    fin: number[];
}

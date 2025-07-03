export class Property {
  id: Number;
  title: String; // Casa Morumbi
  description: String; // Casa grande no centro de São Paulo
  bedroomsMin: Number;
  bedroomsMax: Number;
  bathroomsMin: Number;
  bathroomsMax: Number;
  parkingSpacesMin: Number;
  parkingSpacesMax: Number;
  area: Number; // 120m²
  address: String; // Rua das Flores, 123
  price: Number; // R$ 540.000,00
  featuredImage: String; // https://example.com/image.jpg
  photoGallery: String[]; // ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
  state: String; // São Paulo
  region: String; // Sudeste
  zipCode: String; // 01234-567
  neighborhood: String; // Morumbi
  youTubeVideo: String; // https://www.youtube.com/watch?v=example
  purpose: String; // Venda
  housingType: String; // Apartamento, Casa, Terreno, etc.
  isAvailable: Boolean;
}

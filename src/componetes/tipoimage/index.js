import useApi from "../../services/useApi";



function TipoImage({ tipo_imagem }) {
  const request = `type/${tipo_imagem}`;

  const { data, error, loading } = useApi(request);

  // Verifica se 'data' e as propriedades aninhadas existem antes de acessar
  const link_url = data?.sprites?.["generation-viii"]?.["sword-shield"]?.name_icon || "name" || "";

  return <img src={link_url} alt="Ícone" />;
}

export default TipoImage;


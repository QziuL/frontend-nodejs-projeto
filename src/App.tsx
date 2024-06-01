import "./App.css";
import Modal from "./components/Modal";
import { useState, useEffect, FormEvent, useRef } from "react";
import { FiTrash } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { api } from "./services/api";

interface ProdutoProps {
  _id: string;
  nome: string;
  disponivel: boolean;
  valor: number;
  imgURL: string;
}

function App() {
  let nomeRef = useRef<HTMLInputElement | null>(null);
  let imageRef = useRef<HTMLInputElement | null>(null);
  let valorRef = useRef<HTMLInputElement | null>(null);

  let nomeRefModal = useRef<HTMLInputElement | null>(null);
  let imageRefModal = useRef<HTMLInputElement | null>(null);
  let valorRefModal = useRef<HTMLInputElement | null>(null);

  const [openModal, setStateModal] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
  const [produtoEdit, setProdutoEdit] = useState<ProdutoProps>();
  let [valueRadio, setRadio] = useState(0);

  useEffect(() => {
    loadProdutos();
  }, []);

  async function loadProdutos() {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      alert("Erro: " + error);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nomeRef.current || !imageRef.current || !valorRef.current) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/produto", {
        nome: nomeRef.current?.value,
        disponivel: valueRadio,
        valor: valorRef.current?.value,
        imgURL: imageRef.current?.value,
      });

      setProdutos((allProdutos) => [response.data, ...allProdutos]);
    } catch (error) {
      alert("Erro: " + error);
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    if (
      !nomeRefModal.current ||
      !imageRefModal.current ||
      !valorRefModal.current
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await api.put("/produto", {
        data: {
          id: produtoEdit?._id,
          nome: nomeRefModal.current.value,
          disponivel: valueRadio,
          valor: valorRefModal.current.value,
          imgURL: imageRefModal.current.value,
        },
      });

      nomeRefModal.current = null;
      imageRefModal.current = null;
      valorRefModal.current = null;

      setStateModal(false);
      loadProdutos();
    } catch (error) {
      alert("Erro: " + error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/produto", { params: { id: id } });

      const allProdutos = produtos.filter((produto) => produto._id != id);
      setProdutos(allProdutos);
    } catch (error) {
      alert("Erro: " + error);
    }
  }

  const onClickRadio = (ev: any) => {
    setRadio(ev.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center px-4">
      <main className="my-4 w-full md:max-w-xl">
        <h1 className="flex justify-center text-4xl font-medium text-white">
          Cadastro de Produtos
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            ref={nomeRef}
            type="text"
            placeholder="Digite o nome do produto..."
            className="w-full mb-5 p-2 rounded"
            required
          />
          <label className="font-medium text-white">Imagem do produto:</label>
          <input
            ref={imageRef}
            type="text"
            placeholder="Link da imagem..."
            className="w-full mb-5 p-2 rounded"
            required
          />
          <label className="font-medium text-white">Valor:</label>
          <input
            ref={valorRef}
            type="number"
            placeholder="Digite o valor do produto..."
            className="w-full mb-5 p-2 rounded"
            min="1"
            required
          />

          <div className="flex justify-center">
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="html"
              >
                <input
                  onChange={onClickRadio}
                  value={1}
                  type="radio"
                  name="disponibilidade"
                  id="radio-disponivel"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:before:bg-gray-500 hover:before:opacity-10"
                />{" "}
                <span className="absolute text-gray-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label className="mt-px font-light text-white cursor-pointer select-none">
                Disponivel
              </label>
            </div>

            <div className="inline-flex items-center">
              <label
                className="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="html"
              >
                <input
                  onChange={onClickRadio}
                  value={0}
                  type="radio"
                  name="disponibilidade"
                  id="radio-indisponivel"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:before:bg-gray-500 hover:before:opacity-10"
                />{" "}
                <span className="absolute text-gray-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                className="mt-px font-light text-white cursor-pointer select-none"
                htmlFor="html"
              >
                Indisponivel
              </label>
            </div>
          </div>
          <br />
          <input
            type="submit"
            value="Cadastrar"
            className="text-white cursor-pointer w-full p-2 bg-green-500 rounded font-bold hover:bg-green-700"
          />
          <br />
          <br />
          <hr />
        </form>

        <br />

        <section className="flex flex-col gap-4">
          {produtos.map((produto) => (
            <article className="flex flex-row gap-8 w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
              <div className="w-40 h-28 bg-gray-500 rounded p-1 relative hover:scale-105 duration-200">
                <img
                  className="w-full h-full rounded"
                  alt="imagem produto"
                  src={produto.imgURL != "N/A" ? produto.imgURL : "#"}
                />
              </div>
              <div className="my-3">
                <p>
                  <span className="font-bold">Nome:</span> {produto.nome}
                </p>
                <p>
                  <span className="font-bold">Valor: </span>R${produto.valor}
                </p>
                <p>
                  <span className="font-bold">Disponibilidade:</span>{" "}
                  {produto.disponivel ? "DISPONIVEL" : "INDISPONIVEL"}
                </p>
              </div>

              <button
                className="bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-9 -top-2"
                onClick={() => {
                  setProdutoEdit(produto);
                  setStateModal(true);
                }}
              >
                <FiEdit size={18} color="#FFF" />
              </button>

              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -right-1 -top-2"
                onClick={() => handleDelete(produto._id)}
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>

        <Modal isOpen={openModal} onClose={() => setStateModal(false)}>
          <div className="w-full text-white p-2">
            <h1 className="font-bold text-2xl mb-2">Editar Informações</h1>
            <button onClick={() => console.log(produtoEdit?.nome)}>
              teste
            </button>
            <form onSubmit={handleUpdate}>
              <label>Nome: </label>
              <input
                ref={nomeRefModal}
                type="text"
                className="w-full mb-5 p-2 rounded text-black"
              />

              <label>Imagem:</label>
              <input
                ref={imageRefModal}
                type="text"
                defaultValue={produtoEdit?.imgURL}
                className="w-full mb-5 p-2 rounded text-black"
              />

              <label>Valor: </label>
              <input
                ref={valorRefModal}
                type="number"
                defaultValue={produtoEdit?.valor}
                className="w-full mb-2 p-2 rounded text-black"
                min="1"
              />

              <div className="flex justify-center">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="html"
                  >
                    <input
                      onChange={onClickRadio}
                      value={1}
                      type="radio"
                      name="disponibilidade"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:before:bg-gray-500 hover:before:opacity-10"
                    />{" "}
                    <span className="absolute text-gray-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label className="mt-px font-light text-white cursor-pointer select-none">
                    Disponivel
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="html"
                  >
                    <input
                      onChange={onClickRadio}
                      value={0}
                      type="radio"
                      name="disponibilidade"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:before:bg-gray-500 hover:before:opacity-10"
                    />{" "}
                    <span className="absolute text-gray-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none"
                    htmlFor="html"
                  >
                    Indisponivel
                  </label>
                </div>
              </div>

              <input
                type="submit"
                value="Editar"
                className="font-bold cursor-pointer w-full mt-2 p-2 bg-green-500 rounded hover:bg-green-700"
              />
            </form>
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default App;

from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Simple RAG retrieval
def get_rag_context(query: str) -> str:
    loader = TextLoader("kb/scam_patterns.md")
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)

    vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
    retriever = vectorstore.as_retriever()

    results = retriever.get_relevant_documents(query)
    context = "\n\n".join([doc.page_content for doc in results])
    return context

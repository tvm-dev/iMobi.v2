-- CreateTable
CREATE TABLE "Property" (
    "userId" TEXT NOT NULL,
    "propertyNumber" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "Cidade" TEXT NOT NULL,
    "Bairro" TEXT NOT NULL,
    "Endereço" TEXT NOT NULL,
    "Preço" TEXT NOT NULL,
    "Avaliação" TEXT NOT NULL,
    "Desconto" TEXT NOT NULL,
    "Tipo" TEXT NOT NULL,
    "Modalidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("userId","propertyNumber")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Package, Shield, ArrowLeft } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    orderNumber: "",
    returnReason: "",
    productDescription: "",
    issueDescription: "",
    preferredSolution: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio da solicitação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Dados da solicitação:", formData);
      
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Você receberá um email com o protocolo da sua solicitação em breve.",
      });

      // Reset form
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        orderNumber: "",
        returnReason: "",
        productDescription: "",
        issueDescription: "",
        preferredSolution: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de Trocas e Devoluções</h1>
                <p className="text-sm text-gray-600">Solicite sua troca ou devolução de forma simples</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/login'}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Acesso da Equipe
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <ArrowLeft className="h-6 w-6" />
              Formulário de Solicitação
            </CardTitle>
            <p className="text-blue-100">Preencha todos os campos para processar sua solicitação</p>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados do Cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                    Nome Completo *
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Digite seu nome completo"
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail" className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="text-sm font-medium text-gray-700">
                    Telefone
                  </Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderNumber" className="text-sm font-medium text-gray-700">
                    Número do Pedido *
                  </Label>
                  <Input
                    id="orderNumber"
                    value={formData.orderNumber}
                    onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                    placeholder="Ex: #12345"
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Dados da Solicitação */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="returnReason" className="text-sm font-medium text-gray-700">
                    Motivo da Troca/Devolução *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("returnReason", value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="size">Tamanho inadequado</SelectItem>
                      <SelectItem value="defect">Produto com defeito</SelectItem>
                      <SelectItem value="color">Cor diferente do esperado</SelectItem>
                      <SelectItem value="quality">Qualidade não atende expectativa</SelectItem>
                      <SelectItem value="wrong-product">Produto errado enviado</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
                    Descrição do Produto *
                  </Label>
                  <Input
                    id="productDescription"
                    value={formData.productDescription}
                    onChange={(e) => handleInputChange("productDescription", e.target.value)}
                    placeholder="Ex: Camiseta Polo Azul - Tamanho M"
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueDescription" className="text-sm font-medium text-gray-700">
                    Descrição Detalhada do Problema *
                  </Label>
                  <Textarea
                    id="issueDescription"
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange("issueDescription", e.target.value)}
                    placeholder="Descreva detalhadamente o problema encontrado..."
                    required
                    className="border-gray-300 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredSolution" className="text-sm font-medium text-gray-700">
                    Solução Preferida *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("preferredSolution", value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="O que você prefere?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="exchange">Troca por outro produto</SelectItem>
                      <SelectItem value="refund">Devolução do dinheiro</SelectItem>
                      <SelectItem value="store-credit">Vale compras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium transition-colors"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Envie sua solicitação</h3>
            <p className="text-sm text-gray-600">Preencha o formulário com todos os dados necessários</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Análise interna</h3>
            <p className="text-sm text-gray-600">Nossa equipe analisará sua solicitação em até 48h</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Retorno por email</h3>
            <p className="text-sm text-gray-600">Você receberá todas as atualizações por email</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;

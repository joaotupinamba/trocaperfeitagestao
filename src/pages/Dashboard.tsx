
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { LogOut, User, Clock, Package, Mail, Tag, CheckSquare } from "lucide-react";
import { RequestCard } from "@/components/RequestCard";
import { RequestModal } from "@/components/RequestModal";

interface Request {
  id: string;
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  returnReason: string;
  productDescription: string;
  issueDescription: string;
  status: string;
  tags: string[];
  createdAt: string;
  priority: "low" | "medium" | "high";
  checklist: Array<{ id: string; text: string; completed: boolean }>;
}

const Dashboard = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      customerName: "João Silva",
      customerEmail: "joao@email.com",
      orderNumber: "#12345",
      returnReason: "size",
      productDescription: "Camiseta Polo Azul - Tamanho M",
      issueDescription: "Tamanho muito grande, gostaria de trocar por P",
      status: "pending",
      tags: ["tamanho"],
      createdAt: "2024-01-15T10:00:00Z",
      priority: "medium",
      checklist: [
        { id: "1", text: "Verificar disponibilidade do produto", completed: false },
        { id: "2", text: "Validar condições do produto", completed: false }
      ]
    },
    {
      id: "2",
      customerName: "Maria Santos",
      customerEmail: "maria@email.com",
      orderNumber: "#12346",
      returnReason: "defect",
      productDescription: "Vestido Floral - Tamanho G",
      issueDescription: "Produto chegou com defeito na costura",
      status: "analysis",
      tags: ["defeito", "urgente"],
      createdAt: "2024-01-14T15:30:00Z",
      priority: "high",
      checklist: [
        { id: "3", text: "Analisar fotos do defeito", completed: true },
        { id: "4", text: "Verificar lote de produção", completed: false }
      ]
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { id: "pending", title: "Pendente", color: "bg-yellow-100 border-yellow-300" },
    { id: "analysis", title: "Em Análise", color: "bg-blue-100 border-blue-300" },
    { id: "approved", title: "Aprovado", color: "bg-green-100 border-green-300" },
    { id: "shipping", title: "Aguardando Envio", color: "bg-purple-100 border-purple-300" },
    { id: "received", title: "Recebido", color: "bg-orange-100 border-orange-300" },
    { id: "completed", title: "Concluído", color: "bg-gray-100 border-gray-300" }
  ];

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    setRequests(prev => 
      prev.map(request => 
        request.id === draggableId 
          ? { ...request, status: destination.droppableId }
          : request
      )
    );

    toast({
      title: "Status atualizado",
      description: `Solicitação movida para ${columns.find(col => col.id === destination.droppableId)?.title}`,
    });
  };

  const openRequestModal = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard - Trocas e Devoluções</h1>
                <p className="text-sm text-gray-600">Gerencie todas as solicitações</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                Administrador
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(r => r.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(r => r.status === 'analysis').length}
                  </p>
                  <p className="text-sm text-gray-600">Em Análise</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(r => ['approved', 'shipping', 'received'].includes(r.status)).length}
                  </p>
                  <p className="text-sm text-gray-600">Em Processo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(r => r.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {columns.map(column => (
              <div key={column.id} className="space-y-3">
                <div className={`p-3 rounded-lg border-2 ${column.color}`}>
                  <h3 className="font-semibold text-gray-800 text-center">{column.title}</h3>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    {requests.filter(r => r.status === column.id).length} solicitações
                  </p>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3 min-h-[200px]"
                    >
                      {requests
                        .filter(request => request.status === column.id)
                        .map((request, index) => (
                          <Draggable key={request.id} draggableId={request.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <RequestCard 
                                  request={request} 
                                  onClick={() => openRequestModal(request)}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Request Modal */}
      <RequestModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={(updatedRequest) => {
          setRequests(prev => 
            prev.map(r => r.id === updatedRequest.id ? updatedRequest : r)
          );
          setSelectedRequest(updatedRequest);
        }}
      />
    </div>
  );
};

export default Dashboard;

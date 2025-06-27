
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User, Package, Mail, Phone, Calendar, Tag, CheckSquare, Send, Plus, X } from "lucide-react";

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

interface RequestModalProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (request: Request) => void;
}

export const RequestModal = ({ request, isOpen, onClose, onUpdate }: RequestModalProps) => {
  const [newTag, setNewTag] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [emailNote, setEmailNote] = useState("");

  if (!request) return null;

  const getReasonText = (reason: string) => {
    const reasons = {
      size: "Tamanho inadequado",
      defect: "Produto com defeito",
      color: "Cor diferente do esperado",
      quality: "Qualidade não atende expectativa",
      "wrong-product": "Produto errado enviado",
      other: "Outros"
    };
    return reasons[reason as keyof typeof reasons] || reason;
  };

  const statusOptions = [
    { value: "pending", label: "Pendente" },
    { value: "analysis", label: "Em Análise" },
    { value: "approved", label: "Aprovado" },
    { value: "shipping", label: "Aguardando Envio" },
    { value: "received", label: "Recebido" },
    { value: "completed", label: "Concluído" }
  ];

  const priorityOptions = [
    { value: "low", label: "Baixa" },
    { value: "medium", label: "Média" },
    { value: "high", label: "Alta" }
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !request.tags.includes(newTag.trim())) {
      const updatedRequest = {
        ...request,
        tags: [...request.tags, newTag.trim()]
      };
      onUpdate(updatedRequest);
      setNewTag("");
      toast({
        title: "Etiqueta adicionada",
        description: `Etiqueta "${newTag.trim()}" foi adicionada.`
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedRequest = {
      ...request,
      tags: request.tags.filter(tag => tag !== tagToRemove)
    };
    onUpdate(updatedRequest);
    toast({
      title: "Etiqueta removida",
      description: `Etiqueta "${tagToRemove}" foi removida.`
    });
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const updatedRequest = {
        ...request,
        checklist: [
          ...request.checklist,
          {
            id: Date.now().toString(),
            text: newChecklistItem.trim(),
            completed: false
          }
        ]
      };
      onUpdate(updatedRequest);
      setNewChecklistItem("");
      toast({
        title: "Item adicionado",
        description: "Novo item foi adicionado ao checklist."
      });
    }
  };

  const handleToggleChecklistItem = (itemId: string) => {
    const updatedRequest = {
      ...request,
      checklist: request.checklist.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    };
    onUpdate(updatedRequest);
  };

  const handleStatusChange = (newStatus: string) => {
    const updatedRequest = { ...request, status: newStatus };
    onUpdate(updatedRequest);
    toast({
      title: "Status atualizado",
      description: `Status alterado para ${statusOptions.find(s => s.value === newStatus)?.label}`,
    });
  };

  const handlePriorityChange = (newPriority: string) => {
    const updatedRequest = { ...request, priority: newPriority as "low" | "medium" | "high" };
    onUpdate(updatedRequest);
    toast({
      title: "Prioridade atualizada",
      description: `Prioridade alterada para ${priorityOptions.find(p => p.value === newPriority)?.label}`,
    });
  };

  const handleSendEmail = () => {
    if (emailNote.trim()) {
      toast({
        title: "Email enviado",
        description: `Email com atualização foi enviado para ${request.customerEmail}`,
      });
      setEmailNote("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Solicitação #{request.id} - {request.orderNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Customer Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Dados do Cliente</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{request.customerName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{request.customerEmail}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{new Date(request.createdAt).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Detalhes da Solicitação</h3>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Produto</Label>
                  <p className="text-sm text-gray-900 mt-1">{request.productDescription}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Motivo</Label>
                  <p className="text-sm text-gray-900 mt-1">{getReasonText(request.returnReason)}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Descrição do Problema</Label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                    {request.issueDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Enviar Atualização por Email</h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Digite a mensagem para o cliente..."
                  value={emailNote}
                  onChange={(e) => setEmailNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSendEmail} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Email para Cliente
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Management */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Gerenciamento</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={request.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Prioridade</Label>
                  <Select value={request.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {priorityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Etiquetas</h3>
              
              <div className="flex flex-wrap gap-2">
                {request.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Nova etiqueta..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Checklist de Atividades</h3>
              
              <div className="space-y-2">
                {request.checklist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => handleToggleChecklistItem(item.id)}
                    />
                    <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Nova atividade..."
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                />
                <Button onClick={handleAddChecklistItem} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

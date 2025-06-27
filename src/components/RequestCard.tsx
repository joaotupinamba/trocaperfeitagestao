
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Package, AlertCircle } from "lucide-react";

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

interface RequestCardProps {
  request: Request;
  onClick: () => void;
}

export const RequestCard = ({ request, onClick }: RequestCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getReasonText = (reason: string) => {
    const reasons = {
      size: "Tamanho",
      defect: "Defeito",
      color: "Cor",
      quality: "Qualidade",
      "wrong-product": "Produto Errado",
      other: "Outros"
    };
    return reasons[reason as keyof typeof reasons] || reason;
  };

  const completedTasks = request.checklist.filter(item => item.completed).length;
  const totalTasks = request.checklist.length;

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow bg-white border border-gray-200"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-sm text-gray-900">{request.customerName}</span>
          </div>
          <Badge className={`text-xs ${getPriorityColor(request.priority)}`}>
            {request.priority === "high" ? "Alta" : request.priority === "medium" ? "Média" : "Baixa"}
          </Badge>
        </div>

        {/* Order Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="h-4 w-4" />
            <span>{request.orderNumber}</span>
          </div>
          <p className="text-xs text-gray-800 font-medium line-clamp-2">
            {request.productDescription}
          </p>
        </div>

        {/* Reason */}
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-orange-500" />
          <span className="text-xs text-gray-600">{getReasonText(request.returnReason)}</span>
        </div>

        {/* Tags */}
        {request.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {request.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Checklist</span>
            <span className="text-gray-600">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{new Date(request.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

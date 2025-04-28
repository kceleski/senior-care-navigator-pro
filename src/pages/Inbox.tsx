
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Star, Mail, Archive, Trash, Send } from "lucide-react";

// Mock message data
const messages = [
  {
    id: "1",
    sender: "Sunset Senior Living",
    subject: "New Availability Update",
    message: "We have 2 new rooms available starting next month. Please let us know if any of your clients might be interested.",
    date: "Today, 10:23 AM",
    read: false,
    starred: true,
  },
  {
    id: "2",
    sender: "Margaret Brown",
    subject: "Questions about Golden Years Care Home",
    message: "I wanted to follow up on our conversation about the Golden Years facility. Do they offer memory care services?",
    date: "Today, 8:45 AM",
    read: true,
    starred: false,
  },
  {
    id: "3",
    sender: "Robert Williams",
    subject: "Upcoming Tour Confirmation",
    message: "Just confirming our tour of Serene Gardens tomorrow at 2 PM. Looking forward to it!",
    date: "Yesterday",
    read: true,
    starred: false,
  },
  {
    id: "4",
    sender: "Golden Years Care Home",
    subject: "Updated Pricing Information",
    message: "We've adjusted our pricing structure for the coming year. Please find attached our updated brochure with all details.",
    date: "Apr 26",
    read: true,
    starred: true,
  },
  {
    id: "5",
    sender: "James Davis",
    subject: "Thank you for your help",
    message: "I just wanted to say thank you for helping us find the perfect place for my mother. She's settling in nicely at Sunset Senior Living.",
    date: "Apr 24",
    read: true,
    starred: false,
  },
];

export default function Inbox() {
  const [selectedTab, setSelectedTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbox"
        description="Manage your communications"
      >
        <Button className="bg-care-blue-600 hover:bg-care-blue-700">
          <Plus className="mr-1 h-4 w-4" /> Compose
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-care-neutral-400 h-4 w-4" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="inbox" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="w-full justify-start px-6">
                  <TabsTrigger value="inbox" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Inbox
                  </TabsTrigger>
                  <TabsTrigger value="starred" className="flex items-center gap-2">
                    <Star className="h-4 w-4" /> Starred
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex items-center gap-2">
                    <Send className="h-4 w-4" /> Sent
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="inbox" className="m-0 p-0">
                  <div className="divide-y">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "p-4 cursor-pointer hover:bg-care-blue-50",
                          message.read ? "bg-white" : "bg-care-blue-50",
                          selectedMessage === message.id && "bg-care-blue-100"
                        )}
                        onClick={() => setSelectedMessage(message.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "font-medium",
                            !message.read && "font-semibold"
                          )}>{message.sender}</h3>
                          <span className="text-xs text-care-neutral-500">{message.date}</span>
                        </div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-xs text-care-neutral-500 truncate">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="starred" className="m-0 p-0">
                  <div className="divide-y">
                    {filteredMessages.filter(m => m.starred).map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "p-4 cursor-pointer hover:bg-care-blue-50",
                          selectedMessage === message.id && "bg-care-blue-100"
                        )}
                        onClick={() => setSelectedMessage(message.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{message.sender}</h3>
                          <span className="text-xs text-care-neutral-500">{message.date}</span>
                        </div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-xs text-care-neutral-500 truncate">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="sent" className="m-0 p-0">
                  <div className="p-8 text-center text-care-neutral-500">
                    No sent messages to display.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedMessage ? (
            <Card className="h-full">
              <CardHeader className="pb-3 flex flex-row justify-between items-center">
                <div>
                  <CardTitle>{selectedMessageData?.subject}</CardTitle>
                  <p className="text-sm text-care-neutral-500">From: {selectedMessageData?.sender}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Star className={cn(
                      "h-4 w-4",
                      selectedMessageData?.starred && "fill-yellow-400 text-yellow-400"
                    )} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-4 text-care-neutral-700">
                  {selectedMessageData?.message}
                </div>
                <div className="mt-6">
                  <Button className="bg-care-blue-600 hover:bg-care-blue-700 mr-2">Reply</Button>
                  <Button variant="outline">Forward</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <Mail className="h-12 w-12 text-care-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-care-neutral-700">Select a message</h3>
                <p className="text-care-neutral-500">Choose a message from the inbox to view its contents</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]): string {
  return classes.filter(Boolean).join(' ');
}

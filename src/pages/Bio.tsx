
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Mail, Phone, MapPin, Award, School, User, FileText } from "lucide-react";
import { toast } from "sonner";

export default function Bio() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Peterson",
    title: "Senior Care Specialist",
    email: "sarah.peterson@carenav.com",
    phone: "(555) 123-4567",
    location: "Los Angeles, CA",
    bio: "Over 10 years of experience in elder care placement and senior living advising. Certified Senior Advisor (CSA) with extensive knowledge of assisted living, memory care, and independent living options throughout California.",
    specialties: "Elder Care Placement, Memory Care, Medicare Advice",
    education: "B.S. Gerontology, University of Southern California",
    certifications: "Certified Senior Advisor (CSA), Certified Placement and Referral Specialist (CPRS)"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Bio"
        description="Manage your professional profile information"
      >
        <Button
          variant={isEditing ? "outline" : "default"}
          className={isEditing ? "" : "bg-care-blue-600 hover:bg-care-blue-700"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "Save Changes" : (
            <>
              <Edit2 className="mr-1 h-4 w-4" /> Edit Profile
            </>
          )}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-care-blue-100 flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-care-blue-700">SP</span>
              </div>
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription>{profileData.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-care-neutral-500" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-care-neutral-500" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-care-neutral-500" />
                <span>{profileData.location}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
              <Button variant="outline" className="w-full">View Public Profile</Button>
              <Button variant="outline" className="w-full">Download vCard</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-care-blue-600" />
                <CardTitle>About Me</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialties">Specialties</Label>
                    <Input
                      id="specialties"
                      value={profileData.specialties}
                      onChange={(e) => handleChange("specialties", e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-care-neutral-700">{profileData.bio}</p>
                  <div>
                    <h4 className="text-sm font-medium text-care-neutral-500">Specialties</h4>
                    <p className="text-care-neutral-700">{profileData.specialties}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-care-blue-600" />
                <CardTitle>Credentials</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => handleChange("education", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="certifications">Certifications</Label>
                    <Input
                      id="certifications"
                      value={profileData.certifications}
                      onChange={(e) => handleChange("certifications", e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-care-neutral-500" />
                      <h4 className="text-sm font-medium text-care-neutral-700">Education</h4>
                    </div>
                    <p className="text-care-neutral-700 ml-6">{profileData.education}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-care-neutral-500" />
                      <h4 className="text-sm font-medium text-care-neutral-700">Certifications</h4>
                    </div>
                    <p className="text-care-neutral-700 ml-6">{profileData.certifications}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textArea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

const profileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    title: Yup.string().required("Title is required."),
    location: Yup.string().required("Location is required."),
    email: Yup.string().email("Invalid email address.").required("Email is required."),
    phone: Yup.string().required("Phone number is required."),
    about: Yup.string().min(100, "Please provide a summary of at least 100 characters.").required("About section is required."),
    skills: Yup.string().required("Please list your skills.")
});

const ErrorMessage = ({ name }: { name: string }) => (
    <FormikErrorMessage name={name} render={msg => <div className="text-red-500 text-sm mt-1">{msg}</div>} />
);

export function EditProfileForm({ isOpen, onClose, profile }: { isOpen: boolean, onClose: () => void, profile: any }) {
    const initialValues = {
        name: profile.name,
        title: profile.title,
        location: profile.location,
        email: profile.email,
        phone: profile.phone,
        about: profile.about,
        skills: profile.skills.join(', '),
    };

    const handleSubmit = (values: any) => {
        toast({
            title: "Profile Updated!",
            description: "Your changes have been saved successfully.",
        });
        console.log("Updated Profile:", values);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <Form className="space-y-4 max-h-[70vh] overflow-y-auto pr-6 pl-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Field as={Input} id="name" name="name" />
                                <ErrorMessage name="name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Professional Title</Label>
                                <Field as={Input} id="title" name="title" />
                                <ErrorMessage name="title" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Field as={Input} id="email" name="email" type="email" />
                                <ErrorMessage name="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Field as={Input} id="phone" name="phone" />
                                <ErrorMessage name="phone" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Field as={Input} id="location" name="location" />
                            <ErrorMessage name="location" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="about">About Me</Label>
                            <Field as={Textarea} id="about" name="about" className="min-h-[120px]" />
                            <ErrorMessage name="about" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills (comma-separated)</Label>
                            <Field as={Textarea} id="skills" name="skills" />
                            <ErrorMessage name="skills" />
                        </div>
                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
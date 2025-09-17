import { Formik, Form, Field } from 'formik';
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

const jobPostSchema = Yup.object().shape({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company name is required"),
    location: Yup.string().required("Location is required"),
    type: Yup.string().required("Job type is required"),
    salary: Yup.string().required("Salary range is required"),
    description: Yup.string()
        .min(100, "Description must be at least 100 characters")
        .required("Job description is required"),
    requirements: Yup.string()
        .min(50, "Requirements must be at least 50 characters")
        .required("Job requirements are required"),
    skills: Yup.string().required("Required skills are required"),
});

interface PostJobFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PostJobForm({ isOpen, onClose }: PostJobFormProps) {
    const initialValues = {
        title: '',
        company: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        requirements: '',
        skills: '',
    };

    const handleSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {
        toast({
            title: "Job Posted Successfully!",
            description: "Your job posting has been published.",
        });
        console.log("Job Posted:", values);
        resetForm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new job posting.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={initialValues}
                    validationSchema={jobPostSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-4 max-h-[70vh] overflow-y-auto pr-6 pl-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title</Label>
                                    <Field
                                        as={Input}
                                        id="title"
                                        name="title"
                                        placeholder="e.g., Senior Frontend Developer"
                                    />
                                    {errors.title && touched.title && (
                                        <div className="text-red-500 text-sm">{errors.title}</div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company Name</Label>
                                    <Field
                                        as={Input}
                                        id="company"
                                        name="company"
                                        placeholder="e.g., Tech Solutions Inc."
                                    />
                                    {errors.company && touched.company && (
                                        <div className="text-red-500 text-sm">{errors.company}</div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Field
                                        as={Input}
                                        id="location"
                                        name="location"
                                        placeholder="e.g., San Francisco, CA"
                                    />
                                    {errors.location && touched.location && (
                                        <div className="text-red-500 text-sm">{errors.location}</div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Job Type</Label>
                                    <Field
                                        as={Input}
                                        id="type"
                                        name="type"
                                        placeholder="e.g., Full-time, Contract"
                                    />
                                    {errors.type && touched.type && (
                                        <div className="text-red-500 text-sm">{errors.type}</div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salary Range</Label>
                                    <Field
                                        as={Input}
                                        id="salary"
                                        name="salary"
                                        placeholder="e.g., $80k - $120k"
                                    />
                                    {errors.salary && touched.salary && (
                                        <div className="text-red-500 text-sm">{errors.salary}</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Job Description</Label>
                                <Field
                                    as={Textarea}
                                    id="description"
                                    name="description"
                                    className="min-h-[120px]"
                                    placeholder="Describe the role, responsibilities, and opportunities..."
                                />
                                {errors.description && touched.description && (
                                    <div className="text-red-500 text-sm">{errors.description}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requirements</Label>
                                <Field
                                    as={Textarea}
                                    id="requirements"
                                    name="requirements"
                                    className="min-h-[100px]"
                                    placeholder="List the required qualifications and experience..."
                                />
                                {errors.requirements && touched.requirements && (
                                    <div className="text-red-500 text-sm">{errors.requirements}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="skills">Required Skills</Label>
                                <Field
                                    as={Input}
                                    id="skills"
                                    name="skills"
                                    placeholder="e.g., React, TypeScript, Node.js (comma-separated)"
                                />
                                {errors.skills && touched.skills && (
                                    <div className="text-red-500 text-sm">{errors.skills}</div>
                                )}
                            </div>

                            <DialogFooter className="pt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit">Post Job</Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
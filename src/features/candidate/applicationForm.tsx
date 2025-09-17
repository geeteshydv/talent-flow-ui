import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textArea';

const applicationSchema = Yup.object().shape({
    totalExperience: Yup.number()
        .typeError("Experience must be a number")
        .required("Total experience is required.")
        .min(0, "Experience cannot be negative."),
    relevantExperience: Yup.string()
        .required("Please describe your relevant experience.")
        .min(50, "Please provide at least 50 characters."),
    preferredLocation: Yup.string()
        .required("Preferred location is required.")
        .min(2, "Please enter a valid location."),
    willingToRelocate: Yup.boolean(),
});

interface ApplicationFormValues {
    totalExperience: string | number;
    relevantExperience: string;
    preferredLocation: string;
    willingToRelocate: boolean;
}

interface ApplicationFormProps {
    jobTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

const ErrorMessage = ({ name }: { name: string }) => (
    <FormikErrorMessage name={name} render={msg => <div className="text-red-500 text-sm mt-1">{msg}</div>} />
);

export function ApplicationFormFormik({ jobTitle, isOpen, onClose }: ApplicationFormProps) {
    const initialValues: ApplicationFormValues = {
        totalExperience: '',
        relevantExperience: '',
        preferredLocation: '',
        willingToRelocate: false,
    };

    const handleSubmit = (values: ApplicationFormValues, { resetForm }: { resetForm: () => void }) => {
        toast({
            title: "Application Submitted!",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify({ ...values, job: jobTitle }, null, 2)}</code>
                </pre>
            ),
        });
        resetForm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Apply for {jobTitle}</DialogTitle>
                    <DialogDescription>
                        Please fill out the form below to submit your application.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={initialValues}
                    validationSchema={applicationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="totalExperience">Total Experience (in years)</Label>
                                    <Field as={Input} id="totalExperience" name="totalExperience" placeholder="e.g., 5" />
                                    <ErrorMessage name="totalExperience" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="preferredLocation">Preferred Work Locations</Label>
                                    <Field as={Input} id="preferredLocation" name="preferredLocation" placeholder="e.g., Mumbai, Bengaluru, Remote" />
                                    <ErrorMessage name="preferredLocation" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="relevantExperience">Relevant Experience</Label>
                                <Field as={Textarea} id="relevantExperience" name="relevantExperience" placeholder={`Tell us about your relevant experience for the ${jobTitle} role...`} className="resize-none" />
                                <ErrorMessage name="relevantExperience" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="willingToRelocate" checked={values.willingToRelocate} onCheckedChange={(checked:any) => setFieldValue('willingToRelocate', checked)} />
                                <Label htmlFor="willingToRelocate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Are you willing to relocate for this opportunity?
                                </Label>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit">Submit Application</Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
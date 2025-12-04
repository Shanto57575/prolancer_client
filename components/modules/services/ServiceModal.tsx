"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useState } from "react";
import { toast } from "sonner";
import { createService, updateService } from "@/actions/service/service";

interface Service {
  _id: string;
  name: string;
  description: string;
}

interface ServiceModalProps {
  service?: Service;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ServiceModal({
  service,
  trigger,
  open,
  onOpenChange,
}: ServiceModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setName("");
      setDescription("");
    } else if (service) {
      setName(service.name);
      setDescription(service.description);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    let res;
    if (service) {
      res = await updateService(service._id, formData);
    } else {
      res = await createService(formData);
    }

    if (res.ok) {
      toast.success(res.message);
      handleOpenChange(false);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Service Name</FieldLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Web Development"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a description..."
                  rows={4}
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

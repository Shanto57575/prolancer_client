"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

export default function AddServiceForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Service</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="servicename">service name</FieldLabel>
                <Input
                  id="servicename"
                  type="text"
                  placeholder="Web Development"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="write a description for the service.."
                  rows={4}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

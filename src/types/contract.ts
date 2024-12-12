export interface Contract {
+  id?: string;
+  templateId: string;
+  landlordId: string;
+  propertyId: string;
+  tenantId?: string;
+  status: 'draft' | 'pending' | 'signed' | 'expired' | 'cancelled';
+  createdAt: Date;
+  updatedAt: Date;
+  data: {
+    parties: {
+      landlordName: string;
+      landlordAddress: string;
+      landlordPhone: string;
+      landlordEmail: string;
+      tenantName: string;
+      tenantCpr?: string;
+      tenantPhone: string;
+      tenantEmail: string;
+    };
+    period: {
+      startDate: string;
+      endDate?: string;
+      indefinite: boolean;
+    };
+    payment: {
+      rent: number;
+      dueDate: number;
+      paymentMethod: 'bankTransfer' | 'mobilePay';
+      accountNumber?: string;
+      utilities: {
+        included: boolean;
+        water?: number;
+        heating?: number;
+        electricity?: number;
+        internet?: number;
+      };
+    };
+    deposit: {
+      amount: number;
+      prepaidRent: number;
+      dueDate: string;
+    };
+    houseRules: {
+      smoking: boolean;
+      pets: 'allowed' | 'notAllowed';
+      quietFrom: string;
+      quietTo: string;
+    };
+    specialTerms?: string;
+  };
+}
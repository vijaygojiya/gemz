import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "../../../../../hooks/useMutation";
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import formatTriggerValues from "../../../../../lib/formatTriggerValues";
import revalidate from "../../../../../lib/revalidate";

import { CalendarDays } from "lucide-react-native";

interface IFormValue {
  type: string;
  name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  relationship: string;
  percent_share: string;
}

const estateTypes = [
  {
    id: 1,
    name: "Nominee",
    value: "nominee",
  },
  {
    id: 2,
    name: "Beneficiary (Trust)",
    value: "beneficiary_trust",
  },
  {
    id: 3,
    name: "Beneficiary (Person)",
    value: "beneficiary_person",
  },
];

const URLs = {
  get: "/estate/{id}",
  post: "/estate/",
  put: "/estate/{id}/",
};

function useEstate({ handleClear }: { handleClear: () => void }) {
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess() {
      revalidate("/estate/");
      handleClear();
      if (router.canGoBack()) {
        router.back();
      }
    },
    onError(err, key, config) {
      console.log("Error useEstate ", err, key, config);
    },
  });
  return { trigger, isMutating };
}

function useGetEstate(id?: string) {
  const { data, isLoading } = useTransactionServerQuery<IFormValue>(
    id ? URLs.get.replace("{id}", id) : null,
  );
  return { data, isLoading };
}

function usePutEstate({
  estateId,
  handleClear,
}: {
  estateId: string;
  handleClear: () => void;
}) {
  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", estateId), {
      onSuccess() {
        revalidate("/estate/");
        handleClear();
        if (router.canGoBack()) {
          router.back();
        }
      },
      onError(err, key, config) {
        console.log("Error data upload", err, key, config);
      },
    });
  return { update, isUpdating };
}

export default function EstateForm() {
  const { id } = useLocalSearchParams();
  const estateId = Array.isArray(id) ? id[0] : id;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [value, setValue] = useState<IFormValue>({
    type: "",
    name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    relationship: "",
    percent_share: "",
  });

  const handleChange = (field: string, option: string) => {
    setValue({ ...value, [field]: option });
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate ?? new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setValue({ ...value, date_of_birth: currentDate.toLocaleDateString() });
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    const client = "637fbb50-d59d-467d-b61d-f99aa897b960";
    const payload = formatTriggerValues({ client, ...value });
    if (id) {
      update(payload);
    } else {
      trigger(payload);
    }
  };

  const handleClear = () => {
    setValue({
      type: "",
      name: "",
      date_of_birth: "",
      email: "",
      phone: "",
      relationship: "",
      percent_share: "",
    });
    setShowDatePicker(false);
  };
  const { data } = useGetEstate(estateId);
  const { trigger, isMutating } = useEstate({ handleClear });
  const { update, isUpdating } = usePutEstate({ estateId, handleClear });

  useEffect(() => {
    if (data) {
      setValue({
        ...data,
        percent_share: data.percent_share.toString(),
      });
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <VStack space="2xl" justifyContent="space-between">
        <VStack space="md">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">Name</FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                type="text"
                value={value.name}
                placeholder="Enter the Name"
                onChangeText={(value: string) => {
                  handleChange("name", value);
                }}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">
                Date Of Birth
              </FormControlLabelText>
            </FormControlLabel>
            <TouchableOpacity onPress={handleShowDatePicker}>
              <Input size="sm" isReadOnly>
                <InputField
                  type="text"
                  value={value.date_of_birth}
                  placeholder="Select Date Of Birth"
                />
                <InputSlot pr="$3">
                  <InputIcon as={CalendarDays} />
                </InputSlot>
              </Input>
            </TouchableOpacity>
          </FormControl>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              mode="date"
            />
          )}

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">Email</FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                keyboardType="email-address"
                value={value.email}
                placeholder="Enter the Email"
                onChangeText={(value: string) => {
                  handleChange("email", value);
                }}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">Phone</FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                keyboardType="number-pad"
                value={value.phone}
                placeholder="Enter the Phone"
                onChangeText={(value: string) => {
                  handleChange("phone", value);
                }}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">
                Relationship
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                type="text"
                value={value.relationship}
                placeholder="Enter the Relationship"
                onChangeText={(value: string) => {
                  handleChange("relationship", value);
                }}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">
                Percent Share
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                keyboardType="number-pad"
                value={value.percent_share}
                placeholder="Enter the Percent Share"
                onChangeText={(value: string) => {
                  handleChange("percent_share", value);
                }}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">Type</FormControlLabelText>
            </FormControlLabel>
            <HStack space="md" flexWrap="wrap">
              {estateTypes.map((estateType) => {
                const isActive = estateType.value === value.type;
                return (
                  <TouchableOpacity
                    style={[
                      styles.selectButton,
                      isActive && styles.activeSelectButton,
                    ]}
                    key={estateType.id}
                    onPress={() => {
                      handleChange("type", estateType.value);
                    }}
                  >
                    <Text
                      style={[
                        styles.selectButtonText,
                        isActive && styles.activeSelectButtonText,
                      ]}
                    >
                      {estateType.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </HStack>
          </FormControl>
        </VStack>

        <VStack space="md">
          <Button
            onPress={handleSubmit}
            isDisabled={isMutating || isUpdating}
            size="sm"
          >
            <ButtonText style={styles.buttonText}>Submit</ButtonText>
          </Button>
          <Button
            onPress={handleClear}
            isDisabled={isMutating || isUpdating}
            variant="outline"
            size="sm"
          >
            <ButtonText>Clear</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activeSelectButton: {
    backgroundColor: "#1890FF",
    borderRadius: 4,
    padding: 8,
  },
  activeSelectButtonText: {
    color: "white",
  },
  buttonText: {
    color: "white",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  selectButton: {
    backgroundColor: "#DDEFFF",
    borderColor: "#1890FF",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  selectButtonText: {
    color: "black",
    fontSize: 12,
  },
});

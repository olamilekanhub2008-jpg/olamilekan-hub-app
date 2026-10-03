import React from "react";
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const services = [
  { title: "Website Creation", price: "₦30,000–₦50,000", desc: "Modern websites for businesses, brands and personal projects." },
  { title: "Website Editing", price: "₦20,000", desc: "Updates, fixes, redesigns and content changes for existing websites." },
  { title: "Photo Editing", price: "₦2,000", desc: "Clean, professional photo edits for social media and business use." },
  { title: "Video Editing", price: "₦5,000", desc: "Short-form videos, adverts, reels and promotional edits." },
  { title: "Advertising", price: "₦3,000", desc: "Creative promotional content and digital advertising support." },
  { title: "Flyer Design", price: "₦2,000", desc: "Professional flyer designs for businesses, events and promotions." },
  { title: "Logo Design", price: "₦2,000", desc: "Custom logo concepts for businesses and personal brands." },
  { title: "Building Plan", price: "₦20,000–₦50,000", desc: "Building plan design service based on project requirements." }
];

function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>OLAMILEKAN HUB</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Services")}>
        <Text style={styles.menu}>Services</Text>
      </TouchableOpacity>
    </View>
  );
}

function Home({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <Image source={require("./assets/olamilekan-hub-logo.png")} style={styles.logoImage} resizeMode="contain" />
      <View style={styles.hero}>
        <Text style={styles.badge}>DIGITAL CREATIVE SERVICES</Text>
        <Text style={styles.heroTitle}>Build. Edit. Grow.</Text>
        <Text style={styles.heroText}>
          Olamilekan Hub helps businesses and individuals create professional websites,
          graphics, videos and advertising content.
        </Text>
        <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate("Services")}>
          <Text style={styles.primaryText}>View Services</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>What I Do</Text>
      {services.slice(0, 4).map((s) => (
        <TouchableOpacity key={s.title} style={styles.card} onPress={() => navigation.navigate("Order", { service: s.title })}>
          <Text style={styles.cardTitle}>{s.title}</Text>
          <Text style={styles.price}>{s.price}</Text>
          <Text style={styles.cardText}>{s.desc}</Text>
          <Text style={styles.link}>Request service →</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to start a project?</Text>
        <Text style={styles.ctaText}>Send your requirements and let's discuss your project.</Text>
        <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate("Order")}>
          <Text style={styles.primaryText}>Start an Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Services({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Services</Text>
      <Text style={styles.pageIntro}>Choose a service and send your project requirements.</Text>
      {services.map((s) => (
        <View key={s.title} style={styles.card}>
          <Text style={styles.cardTitle}>{s.title}</Text>
          <Text style={styles.price}>{s.price}</Text>
          <Text style={styles.cardText}>{s.desc}</Text>
          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("Order", { service: s.title })}>
            <Text style={styles.smallButtonText}>Order this service</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

function Order({ route, navigation }) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [service, setService] = React.useState(route.params?.service || "");
  const [details, setDetails] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [photo, setPhoto] = React.useState(null);
  const [fileName, setFileName] = React.useState("");

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.85
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (!result.canceled) setFileName(result.assets[0].name);
  };

  const sendWhatsApp = () => {
    if (!name || !phone || !service || !details) {
      Alert.alert("Missing details", "Please fill in your name, phone, service and project details.");
      return;
    }
    const message =
      `Hello Olamilekan Hub.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget || "Not specified"}\nProject details: ${details}\nPhoto attached: ${photo ? "Yes" : "No"}\nFile selected: ${fileName || "No"}`;
    Linking.openURL(`https://wa.me/2348064332324?text=${encodeURIComponent(message)}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require("./olamilekan-hub-logo.png")} style={styles.formLogo} resizeMode="contain" />
      <Text style={styles.pageTitle}>Order a Service</Text>
      <Text style={styles.pageIntro}>Fill the form. You can attach a photo or project file, then send your request to WhatsApp.</Text>

      <Text style={styles.label}>Your name *</Text>
      <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Phone number *</Text>
      <TextInput style={styles.input} placeholder="080..." keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

      <Text style={styles.label}>Service *</Text>
      <TextInput style={styles.input} placeholder="e.g. Website Creation" value={service} onChangeText={setService} />

      <Text style={styles.label}>Your budget</Text>
      <TextInput style={styles.input} placeholder="e.g. ₦50,000" value={budget} onChangeText={setBudget} />

      <Text style={styles.label}>Project details *</Text>
      <TextInput style={[styles.input, styles.textArea]} placeholder="Describe what you want..." multiline value={details} onChangeText={setDetails} />

      <TouchableOpacity style={styles.uploadButton} onPress={pickPhoto}>
        <Text style={styles.uploadText}>{photo ? "Photo selected ✓" : "📷 Add a photo"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
        <Text style={styles.uploadText}>{fileName ? `File: ${fileName}` : "📎 Attach a project file"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={sendWhatsApp}>
        <Text style={styles.primaryText}>Submit Order on WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate("Payment")}>
        <Text style={styles.secondaryText}>View Payment Options</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Portfolio() {
  const openPortfolio = () => Linking.openURL("https://olamilekan-hub.netlify.app");

  return (
    <ScrollView style={styles.container}>
      <Image source={require("./assets/olamilekan-hub-logo.png")} style={styles.formLogo} resizeMode="contain" />
      <Text style={styles.pageTitle}>Portfolio</Text>
      <Text style={styles.pageIntro}>
        Explore Olamilekan Hub projects and services on the portfolio website.
      </Text>

      <View style={styles.portfolioBox}>
        <Text style={styles.cardTitle}>Olamilekan Hub Website</Text>
        <Text style={styles.cardText}>
          View the current website, services and business presentation.
        </Text>
        <TouchableOpacity style={styles.smallButton} onPress={openPortfolio}>
          <Text style={styles.smallButtonText}>Open Portfolio Website</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.galleryTitle}>Recent Work Samples</Text>

      <View style={styles.portfolioItem}>
        <Image source={require("./portfolio-building-1.jpg")} style={styles.portfolioImage} resizeMode="cover" />
        <Text style={styles.portfolioCaption}>Building Plan / Foundation Work</Text>
        <Text style={styles.cardText}>Construction and building-project work sample.</Text>
      </View>

      <View style={styles.portfolioItem}>
        <Image source={require("./portfolio-building-2.jpg")} style={styles.portfolioImage} resizeMode="cover" />
        <Text style={styles.portfolioCaption}>Building Construction Work</Text>
        <Text style={styles.cardText}>Building and foundation project work sample.</Text>
      </View>

      <View style={styles.portfolioItem}>
        <Image source={require("./portfolio-flyer-1.jpg")} style={styles.portfolioImage} resizeMode="cover" />
        <Text style={styles.portfolioCaption}>Flyer / Advertising Design</Text>
        <Text style={styles.cardText}>Promotional flyer design sample.</Text>
      </View>

      <View style={styles.portfolioBox}>
        <Text style={styles.cardTitle}>Portfolio Categories</Text>
        <Text style={styles.cardText}>• Website Creation{"\n"}• Website Editing{"\n"}• Photo Editing{"\n"}• Video Editing{"\n"}• Advertising{"\n"}• Flyer Design{"\n"}• Logo Design{"\n"}• Building Plan Design</Text>
      </View>

      <Text style={styles.note}>
        These are work samples supplied for the Olamilekan Hub portfolio. More samples can be added anytime.
      </Text>
    </ScrollView>
  );
}

function Payment() {
  const confirmPayment = () => Linking.openURL("https://wa.me/2348064332324?text=Hello%20Olamilekan%20Hub%2C%20I%20have%20made%20a%20payment%20and%20would%20like%20to%20send%20my%20payment%20confirmation.");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Payment Options</Text>
      <Text style={styles.pageIntro}>Use the OPay details below to pay for your selected Olamilekan Hub service.</Text>
      <View style={styles.paymentCard}>
        <Text style={styles.cardTitle}>OPay</Text>
        <Text style={styles.cardText}>Account Name: Buhari Ibrahim Olamilekan</Text>
        <Text style={styles.cardText}>Account Number: 8064332324</Text>
      </View>
      <TouchableOpacity style={styles.primary} onPress={confirmPayment}>
        <Text style={styles.primaryText}>I Have Paid — Send Confirmation</Text>
      </TouchableOpacity>
      <Text style={styles.note}>Never share your PIN, OTP, card PIN or password with customers.</Text>
    </ScrollView>
  );
}

function Contact() {
  const openWebsite = () => Linking.openURL("https://olamilekan-hub.netlify.app");
  const openWhatsApp = () => Linking.openURL("https://wa.me/2348064332324"); // Replace number

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Contact Olamilekan Hub</Text>
      <Text style={styles.pageIntro}>Let's discuss your next project.</Text>

      <TouchableOpacity style={styles.contactCard} onPress={openWhatsApp}>
        <Text style={styles.cardTitle}>WhatsApp</Text>
        <Text style={styles.cardText}>Chat directly about your project.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactCard} onPress={openWebsite}>
        <Text style={styles.cardTitle}>Website</Text>
        <Text style={styles.cardText}>olamilekan-hub.netlify.app</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function About() {
  return (
    <ScrollView style={styles.container}>
      <Image source={require("./assets/olamilekan-hub-logo.png")} style={styles.aboutLogo} resizeMode="contain" />
      <Text style={styles.pageTitle}>About Olamilekan Hub</Text>
      <Text style={styles.pageIntro}>
        Olamilekan Hub provides digital creative services including website creation,
        website editing, photo editing, video editing and advertising content.
      </Text>
    </ScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0B1220" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "800" }
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: "Olamilekan Hub" }} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Portfolio" component={Portfolio} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB", padding: 18 },
  logoImage: { width: "100%", height: 260, backgroundColor: "#0B1220", marginBottom: 0 },
  formLogo: { width: "100%", height: 180, marginBottom: 8 },
  aboutLogo: { width: "100%", height: 220, marginBottom: 8 },
  header: { backgroundColor: "#0B1220", marginHorizontal: -18, marginTop: -18, padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "#FFFFFF", fontWeight: "900", fontSize: 18 },
  menu: { color: "#DCE7FF", fontWeight: "700" },
  hero: { backgroundColor: "#0B1220", marginHorizontal: -18, padding: 26, paddingBottom: 34 },
  badge: { color: "#8FB3FF", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  heroTitle: { color: "#FFFFFF", fontSize: 38, fontWeight: "900", marginTop: 10 },
  heroText: { color: "#DCE3F0", fontSize: 16, lineHeight: 24, marginTop: 12 },
  primary: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 18 },
  primaryText: { color: "#0B1220", fontWeight: "900" },
  sectionTitle: { fontSize: 24, fontWeight: "900", marginTop: 28, marginBottom: 12, color: "#111827" },
  pageTitle: { fontSize: 30, fontWeight: "900", marginTop: 8, color: "#111827" },
  pageIntro: { color: "#5B6472", fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 18 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 18, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
  cardText: { color: "#5B6472", lineHeight: 21, marginTop: 7 },
  price: { color: "#C99700", fontSize: 18, fontWeight: "900", marginTop: 8 },
  link: { color: "#315DFF", fontWeight: "800", marginTop: 12 },
  smallButton: { backgroundColor: "#0B1220", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 14 },
  smallButtonText: { color: "#FFFFFF", fontWeight: "800" },
  cta: { backgroundColor: "#E8EEFF", borderRadius: 16, padding: 20, marginTop: 12, marginBottom: 30 },
  ctaTitle: { fontSize: 20, fontWeight: "900", color: "#111827" },
  ctaText: { color: "#4B5563", marginTop: 6 },
  label: { fontWeight: "800", color: "#111827", marginTop: 10, marginBottom: 7 },
  input: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#D9DEE8", fontSize: 15 },
  textArea: { minHeight: 130, textAlignVertical: "top" },
  secondary: { borderWidth: 1, borderColor: "#0B1220", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 12, marginBottom: 30 },
  secondaryText: { color: "#0B1220", fontWeight: "800" },
  uploadButton: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#C9D0DC", borderStyle: "dashed", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 12 },
  uploadText: { color: "#0B1220", fontWeight: "800" },
  paymentCard: { backgroundColor: "#FFFFFF", padding: 18, borderRadius: 16, marginBottom: 12 },
  note: { color: "#6B7280", fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 30 },
  portfolioBox: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 18, marginBottom: 14 },
  galleryTitle: { fontSize: 22, fontWeight: "900", color: "#111827", marginBottom: 12 },
  portfolioItem: { backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden", marginBottom: 16, elevation: 2 },
  portfolioImage: { width: "100%", height: 250 },
  portfolioCaption: { fontSize: 18, fontWeight: "900", color: "#111827", paddingHorizontal: 16, paddingTop: 14 },
  contactCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20, marginBottom: 14 }
});

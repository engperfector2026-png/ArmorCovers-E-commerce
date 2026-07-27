import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FolderTree, ChevronDown, ChevronRight } from "lucide-react";

const MAIN_CATEGORIES = [
  {
    name: "Electronics",
    icon: "🔌",
    subcategories: [
      "Consumer Electronics",
      "Computing & Office Electronics",
      "Gaming & Entertainment",
      "Home & Kitchen Electronics",
      "Electrical & Power",
      "Tools & Industrial Electronics",
      "Automotive Electronics",
    ],
  },
  {
    name: "Vehicles",
    icon: "🚗",
    subcategories: [
      "Car Covers & Protection",
      "Motorcycle & Bike Covers",
      "Vehicle Accessories",
      "Truck & Heavy Vehicle Covers",
      "Interior Protection",
      "Car Electronics",
    ],
  },
  {
    name: "Fashion",
    icon: "👕",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids & Baby Fashion",
      "Footwear",
      "Bags & Accessories",
      "Traditional & Cultural Wear",
    ],
  },
  {
    name: "Home",
    icon: "🏠",
    subcategories: [
      "Furniture & Decor",
      "Home Textiles & Bedding",
      "Kitchen & Dining",
      "Home Improvement",
      "Lighting & Electricals",
      "Garden & Outdoor",
    ],
  },
  {
    name: "Agriculture",
    icon: "🌾",
    subcategories: [
      "Farming Tools & Equipment",
      "Seeds & Fertilizers",
      "Irrigation Systems",
      "Protective Covers & Nets",
      "Animal Husbandry",
      "Harvesting & Storage",
    ],
  },
  {
    name: "Beauty",
    icon: "💄",
    subcategories: [
      "Skincare",
      "Hair Care",
      "Makeup & Cosmetics",
      "Fragrances",
      "Personal Care",
      "Beauty Tools & Devices",
    ],
  },
  {
    name: "Sports",
    icon: "⚽",
    subcategories: [
      "Fitness Equipment",
      "Outdoor Sports",
      "Team Sports",
      "Sports Apparel & Gear",
      "Camping & Hiking",
      "Sports Protection",
    ],
  },
  {
    name: "Health",
    icon: "🩺",
    subcategories: [
      "Medical Supplies",
      "Supplements & Nutrition",
      "Personal Hygiene",
      "Fitness & Wellness",
      "First Aid & Safety",
    ],
  },
  {
    name: "Stationery",
    icon: "📝",
    subcategories: [
      "Writing Instruments",
      "Notebooks & Paper",
      "Office Supplies",
      "Art & Craft Supplies",
      "School Supplies",
    ],
  },
  {
    name: "Education",
    icon: "📚",
    subcategories: [
      "Books & Textbooks",
      "Learning Materials",
      "Educational Toys",
      "School Furniture",
      "E-Learning Devices",
    ],
  },
];

const ManageCategories = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (name: string) => {
    setExpanded(expanded === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin-dashboard"
            className="p-2 hover:bg-gray-200 rounded-xl transition"
          >
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
            <p className="text-gray-500 mt-1">
              {MAIN_CATEGORIES.length} main categories with subcategories
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {MAIN_CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(category.name)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.subcategories.length} subcategories
                    </p>
                  </div>
                </div>
                {expanded === category.name ? (
                  <ChevronDown size={22} className="text-gray-400" />
                ) : (
                  <ChevronRight size={22} className="text-gray-400" />
                )}
              </button>

              {expanded === category.name && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {category.subcategories.map((sub) => (
                      <div
                        key={sub}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <FolderTree size={16} className="text-orange-500" />
                        <span className="text-sm text-gray-700">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
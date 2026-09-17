"""
Multi-State Farm Dataset for National Precision Agriculture Demo
Covers Punjab, Bihar, Maharashtra, Karnataka, and West Bengal agro-climatic zones.
"""

MULTI_STATE_FARMS = [
    {
        "state": "Punjab",
        "district": "Ludhiana",
        "farm_name": "Golden Grain Acres",
        "farmer_name": "Gurpreet Singh",
        "crop": "Durum Wheat (WHD-943)",
        "area_acres": 25.0,
        "health_score": 89,
        "primary_threat": "None (Preventative monitoring)",
        "soil_type": "Rich Loam",
        "irrigation": "Canal + Tube Well"
    },
    {
        "state": "Bihar",
        "district": "Patna",
        "farm_name": "Green Valley Farm",
        "farmer_name": "Rammohan Kumar",
        "crop": "Wheat (HD-2967)",
        "area_acres": 12.5,
        "health_score": 82,
        "primary_threat": "Yellow Rust (Puccinia striiformis) 7.4%",
        "soil_type": "Gangetic Alluvial",
        "irrigation": "Borewell Drip"
    },
    {
        "state": "Maharashtra",
        "district": "Yavatmal",
        "farm_name": "Vidarbha Cotton Estate",
        "farmer_name": "Kailash Patil",
        "crop": "Bt Cotton (RCH-659)",
        "area_acres": 18.0,
        "health_score": 74,
        "primary_threat": "Pink Bollworm (Pectinophora gossypiella)",
        "soil_type": "Black Cotton Soil (Vertisol)",
        "irrigation": "Rainfed + Micro-Sprinkler"
    },
    {
        "state": "Karnataka",
        "district": "Chikkamagaluru",
        "farm_name": "Western Ghats Plantation",
        "farmer_name": "Devappa Gowda",
        "crop": "Arabica Coffee & Pepper",
        "area_acres": 30.0,
        "health_score": 93,
        "primary_threat": "Coffee Leaf Rust (Hemileia vastatrix) Low",
        "soil_type": "Laterite Red Soil",
        "irrigation": "High Altitude Rainfed"
    },
    {
        "state": "West Bengal",
        "district": "Burdwan",
        "farm_name": "Shonar Bangla Paddy Field",
        "farmer_name": "Subhashish Roy",
        "crop": "Aman Paddy (Swarna Sub-1)",
        "area_acres": 14.0,
        "health_score": 79,
        "primary_threat": "Bacterial Panicle Blight",
        "soil_type": "Deltaic Alluvium",
        "irrigation": "River Lift Irrigation"
    }
]

def get_national_summary():
    total_acres = sum(f["area_acres"] for f in MULTI_STATE_FARMS)
    avg_score = sum(f["health_score"] for f in MULTI_STATE_FARMS) / len(MULTI_STATE_FARMS)
    return {
        "total_farms_monitored": len(MULTI_STATE_FARMS),
        "total_acreage": total_acres,
        "national_health_average": round(avg_score, 1),
        "active_states": list(set(f["state"] for f in MULTI_STATE_FARMS))
    }

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { SectionLabel } from "./Ui";
import { plans } from "./HeroData";

export default function PricingSection() {
    return (
        <section className="py-16 sm:py-24 lg:py-[100px] px-[5vw] bg-worknub-mint">
            <div className="max-w-[1280px] mx-auto">
                <div className="text-center mb-10 sm:mb-12 lg:mb-14">
                    <SectionLabel>Pricing Plans</SectionLabel>
                    <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-gray-900 tracking-[-0.02em]">
                        Flexible Plans for Every Stage
                    </h2>
                    <p className="text-gray-600 mt-3 text-base">No hidden fees. Cancel or change anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-[20px] p-6 sm:p-8 relative ${plan.highlight ? "bg-worknub-dark border-2 border-worknub-green" : "bg-white border border-gray-200"}`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-worknub-green text-white text-[10px] sm:text-[11px] font-bold tracking-[0.06em] uppercase px-3 sm:px-3.5 py-1 rounded-full whitespace-nowrap">
                                    {plan.badge}
                                </div>
                            )}
                            <p className="text-gray-400 text-xs font-semibold tracking-[0.08em] uppercase mb-1.5">{plan.name}</p>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className={`text-[2.4rem] font-black tracking-[-0.03em] ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                                    ₦{plan.naira}
                                </span>
                                <span className="text-[13px] text-gray-400">{plan.period}</span>
                            </div>
                            <p className="text-gray-400 text-[13px] mb-6 leading-[1.6]">{plan.description}</p>
                            <ul className="list-none p-0 m-0 mb-7 flex flex-col gap-2.5 h-[200px]">
                                {plan.features.map((f, fi) => (
                                    <li key={fi} className="flex items-center gap-2.5 text-[13.5px] text-gray-700">
                                        <span className="w-[18px] h-[18px] bg-worknub-green/[0.13] rounded-full flex items-center justify-center shrink-0">
                                            <FiCheck size={10} className="text-worknub-green" strokeWidth={3} />
                                        </span>
                                        <span className={`${plan.highlight ? "text-white" : "text-gray-700"}`}>
                                       {f}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/pricing"
                                className={`block text-center px-5 py-3 rounded-lg font-bold text-sm no-underline transition-colors ${plan.highlight
                                        ? "bg-worknub-green text-white hover:opacity-90"
                                        : "bg-transparent text-worknub-green border border-worknub-green hover:bg-worknub-green hover:text-white"
                                    }`}>
                                Get Started
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* <p className="text-center mt-8 lg:mt-7 text-gray-600 text-[12px] sm:text-[13px]">
                    Need a custom plan?{" "}
                    <Link target="_blank" href="https://api.whatsapp.com/send/?phone=2347077732936&text&type=phone_number&app_absent=0" className="text-worknub-green font-semibold no-underline hover:underline">Talk to us →</Link>
                </p> */}


                  <p className="text-center mt-8 lg:mt-7 text-gray-600 text-[12px] sm:text-[13px]">
              
                    <Link target="_blank" href="/pricing" className="text-worknub-green font-semibold no-underline hover:underline">View More →</Link>
                </p>
            </div>
        </section>
    );
}